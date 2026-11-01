/*
 ============================================================
  EXAM PRACTICE BACKEND  (Google Apps Script, single file)
 ============================================================

  STEP 1. SCRIPT PROPERTY TO ADD  (only one)
  ------------------------------------------
  Apps Script editor -> Project Settings (gear icon) -> Script Properties
  -> Add script property:

      Property : SHEET_ID
      Value    : the long id from your Google Sheet URL
                 https://docs.google.com/spreadsheets/d/<THIS_PART>/edit

  (If you create this script from inside the sheet via
   Extensions -> Apps Script, SHEET_ID is optional: the script
   will use that sheet automatically.)

  STEP 2. RUN setup() ONCE
  ------------------------
  Pick "setup" in the function dropdown and press Run. Allow the
  permissions. It creates two tabs with headers:
      Questions   (one row per question)
      Results     (one row per finished exam)

  STEP 3. MANIFEST + DEPLOY
  -------------------------
  Project Settings -> tick "Show appsscript.json manifest file in editor".
  Open appsscript.json in the editor and replace its content with the
  provided appsscript.json file.

  Deploy -> New deployment -> type: Web app
      Execute as     : Me
      Who has access : Anyone
  Copy the Web app URL (ends with /exec) and paste it into
  config.js as API_URL.

  After you edit this file later: Deploy -> Manage deployments ->
  pencil icon -> Version: New version -> Deploy. (The URL stays same.)

  TEST: open  <WEB_APP_URL>?action=ids  in a browser.
  You should see {"ids":[]}.

  RULES
  -----
  * Upload is INSERT ONLY. If a question id already exists in the
    sheet, that question is skipped and the old row is left untouched.
  * Anyone who has the URL can read and write your sheet, so keep the
    URL private.
 ============================================================
*/

const QUESTIONS_TAB = "Questions";
const RESULTS_TAB = "Results";
const USERS_TAB = "Users";

// Drive folder where candidate PNG photos are stored (one file per email: <email>.png)
const IMAGE_FOLDER_ID = "1OmbQejgjswsST2KB2O2sVJR4U2E5WU3c";
const U_HEADERS = ["email", "name", "photoFile", "firstSeen", "lastSeen"];

const Q_HEADERS = [
  "id", "exam", "branch", "year", "subject", "question_number", "question_type",
  "answer_format", "marks", "negative_marks", "exam_label", "question", "options",
  "answer", "explanation", "images", "source_page", "answer_status",
];
const META_COLS = 9; // id .. marks (first 9 columns) are sent to the setup page

const R_HEADERS = [
  "finishedAt", "branch", "year", "topic", "total", "score", "maxScore", "correct",
  "wrong", "unattempted", "noKey", "accuracy", "timeTakenSec", "durationSec",
  "autoSubmitted", "bySubject", "detail", "name", "email", "attemptId", "status",
];
const R_TEXT_COLS = ["year", "topic", "bySubject", "detail", "name", "email", "attemptId", "status"];

/* ---------------- one-time setup ---------------- */
function setup() {
  getSheet_(QUESTIONS_TAB, Q_HEADERS);
  getSheet_(RESULTS_TAB, R_HEADERS);
  getSheet_(USERS_TAB, U_HEADERS);
  getSheet_(GP_QUESTIONS_TAB, GP_HEADERS);
  DriveApp.getFolderById(IMAGE_FOLDER_ID).getName();   // makes Google ask for Drive permission
  Logger.log("Done. Sheets and Drive folder are ready.");
}

/* ---------------- web app entry points ---------------- */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "";
    if (action === "meta") return json_({ meta: readMeta_() });
    if (action === "ids") return json_({ ids: readIds_() });
    if (action === "results") return json_({ results: readResults_(e.parameter.email) });
    if (action === "gpMeta") return json_({ meta: gpReadMeta_() });
    return json_({ error: "Unknown action. Use ?action=meta, ?action=ids, ?action=results or ?action=gpMeta" });
  } catch (err) {
    return json_({ error: String(err && err.message || err) });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action === "getByIds") return json_({ questions: readByIds_(body.ids || []) });
    if (body.action === "gpGetByIds") return json_({ questions: gpReadByIds_(body.ids || []) });
    lock.waitLock(30000);
    locked = true;
    if (body.action === "upload") return json_(insertQuestions_(body.rows || []));
    if (body.action === "gpUpload") return json_(gpUpload_(body));
    if (body.action === "saveResult") return json_(appendResult_(body.result));
    if (body.action === "register") return json_(registerUser_(body));
    return json_({ error: "Unknown action: " + body.action });
  } catch (err) {
    return json_({ error: String(err && err.message || err) });
  } finally {
    if (locked) { try { lock.releaseLock(); } catch (x) {} }
  }
}

/* ---------------- questions ---------------- */
function readMeta_() {
  const sh = getSheet_(QUESTIONS_TAB, Q_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const values = sh.getRange(2, 1, last - 1, META_COLS).getValues();
  const out = [];
  values.forEach(function (row) {
    if (row[0] === "" || row[0] === null) return;
    const o = {};
    for (let i = 0; i < META_COLS; i++) o[Q_HEADERS[i]] = row[i];
    out.push(o);
  });
  return out;
}

function readIds_() {
  const sh = getSheet_(QUESTIONS_TAB, Q_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, 1).getValues()
    .map(function (r) { return String(r[0]); })
    .filter(function (id) { return id !== ""; });
}

function readByIds_(ids) {
  const want = {};
  ids.forEach(function (id) { want[String(id)] = true; });
  const sh = getSheet_(QUESTIONS_TAB, Q_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const values = sh.getRange(2, 1, last - 1, Q_HEADERS.length).getValues();
  const out = [];
  values.forEach(function (row) {
    if (!want[String(row[0])]) return;
    const o = {};
    Q_HEADERS.forEach(function (h, i) { o[h] = row[i]; });
    out.push(o);
  });
  return out;
}

// INSERT ONLY: ids already in the sheet are skipped (never overwritten).
function insertQuestions_(rows) {
  const sh = getSheet_(QUESTIONS_TAB, Q_HEADERS);
  const last = sh.getLastRow();
  const seen = {};
  if (last > 1) {
    sh.getRange(2, 1, last - 1, 1).getValues().forEach(function (r) { seen[String(r[0])] = true; });
  }
  const lines = [];
  let skipped = 0;
  rows.forEach(function (r) {
    if (!r || r.id === undefined || r.id === null || r.id === "") { skipped++; return; }
    const id = String(r.id);
    if (seen[id]) { skipped++; return; }
    seen[id] = true;
    lines.push(Q_HEADERS.map(function (h) { return cell_(r[h]); }));
  });
  if (lines.length) appendBlock_(sh, lines, null);
  return { ok: true, added: lines.length, skipped: skipped };
}

/* ---------------- results ---------------- */
function appendResult_(r) {
  if (!r) throw new Error("No result received");
  const sh = getSheet_(RESULTS_TAB, R_HEADERS);
  const f = r.filters || {};
  const line = [
    r.finishedAt, f.branch, String(f.year), f.topic, r.total, r.score, r.maxScore, r.correct,
    r.wrong, r.unattempted, r.noKey, r.accuracy, r.timeTakenSec, r.durationSec,
    r.autoSubmitted ? "yes" : "no", JSON.stringify(r.bySubject || {}), JSON.stringify(r.detail || []),
    String(r.name || ""), String(r.email || "").trim().toLowerCase(),
    String(r.attemptId || ""), String(r.status || "completed"),
  ].map(cell_);
  // same attemptId = same exam: progress saves and the final save update ONE row
  const last = sh.getLastRow();
  const idCol = R_HEADERS.indexOf("attemptId") + 1;
  if (r.attemptId && last > 1) {
    const ids = sh.getRange(2, idCol, last - 1, 1).getValues();
    for (let i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(r.attemptId)) {
        sh.getRange(i + 2, 1, 1, line.length).setValues([line]);
        return { ok: true, updated: true };
      }
    }
  }
  appendBlock_(sh, [line], R_TEXT_COLS.map(function (h) { return R_HEADERS.indexOf(h) + 1; }));
  return { ok: true };
}

function readResults_(email) {
  email = String(email || "").trim().toLowerCase();
  if (!email) return [];                       // results are per candidate
  const sh = getSheet_(RESULTS_TAB, R_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const emailCol = R_HEADERS.indexOf("email");
  const values = sh.getRange(2, 1, last - 1, R_HEADERS.length).getValues();
  return values.filter(function (r) {
    return r[0] !== "" && String(r[emailCol]).trim().toLowerCase() === email;
  }).map(function (r) {
    const o = {};
    R_HEADERS.forEach(function (h, i) { o[h] = r[i]; });
    return {
      finishedAt: o.finishedAt instanceof Date ? o.finishedAt.toISOString() : String(o.finishedAt),
      filters: { branch: o.branch, year: String(o.year), topic: o.topic },
      total: Number(o.total), score: Number(o.score), maxScore: Number(o.maxScore),
      correct: Number(o.correct), wrong: Number(o.wrong), unattempted: Number(o.unattempted),
      noKey: Number(o.noKey), accuracy: Number(o.accuracy),
      timeTakenSec: Number(o.timeTakenSec), durationSec: Number(o.durationSec),
      autoSubmitted: o.autoSubmitted === "yes", status: String(o.status || "completed"), attemptId: String(o.attemptId || ""),
      bySubject: safeParse_(o.bySubject, {}), detail: safeParse_(o.detail, []),
    };
  });
}

/* ---------------- candidates ---------------- */
// Email is the key (always saved in lower case). Name is only for show and is never verified.
//  * same name + different emails      -> fine, each email gets its own row
//  * same email + different name       -> returns {conflict:true, oldName}; nothing changes until the
//                                         page calls again with confirmRename:true, then the old name is replaced
function normName_(n) { return String(n || "").trim().replace(/\s+/g, " ").toLowerCase(); }

function registerUser_(b) {
  const email = String(b.email || "").trim().toLowerCase();
  const name = String(b.name || "").trim().replace(/\s+/g, " ");
  if (!email || !name) throw new Error("Name and email are required");
  const sh = getSheet_(USERS_TAB, U_HEADERS);
  const last = sh.getLastRow();
  let row = -1, oldName = "";
  if (last > 1) {
    const vals = sh.getRange(2, 1, last - 1, 2).getValues();
    for (let i = 0; i < vals.length; i++) {
      if (String(vals[i][0]).trim().toLowerCase() === email) { row = i + 2; oldName = String(vals[i][1]); break; }
    }
  }
  const now = new Date().toISOString();
  if (row < 0) {
    appendBlock_(sh, [[email, name, "", now, now]], null);
    row = sh.getLastRow();
  } else {
    if (normName_(oldName) !== normName_(name) && !b.confirmRename) {
      return { conflict: true, oldName: oldName, email: email };
    }
    sh.getRange(row, 2).setValue(name);          // replaces the old name
    sh.getRange(row, 5).setValue(now);
  }
  let photo = null;
  if (b.photo) {
    savePhoto_(email, String(b.photo));
    sh.getRange(row, 3).setValue(email + ".png");
    photo = String(b.photo);
  } else {
    photo = readPhoto_(email);
  }
  return { ok: true, name: name, email: email, photo: photo, oldName: oldName };
}

function savePhoto_(email, dataUrl) {
  const m = /^data:image\/png;base64,([A-Za-z0-9+\/=]+)$/.exec(dataUrl);
  if (!m) throw new Error("Photo must be a PNG image");
  const bytes = Utilities.base64Decode(m[1]);
  if (bytes.length > 3 * 1024 * 1024) throw new Error("Photo is too large");
  const folder = DriveApp.getFolderById(IMAGE_FOLDER_ID);
  const name = email + ".png";
  const old = folder.getFilesByName(name);
  while (old.hasNext()) old.next().setTrashed(true);   // keep one photo per email
  folder.createFile(Utilities.newBlob(bytes, "image/png", name));
}

function readPhoto_(email) {
  try {
    const it = DriveApp.getFolderById(IMAGE_FOLDER_ID).getFilesByName(email + ".png");
    if (!it.hasNext()) return null;
    return "data:image/png;base64," + Utilities.base64Encode(it.next().getBlob().getBytes());
  } catch (e) { return null; }
}

/* ---------------- helpers ---------------- */
function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (id) return SpreadsheetApp.openById(id);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  throw new Error("Script property SHEET_ID is missing. Add it in Project Settings -> Script Properties.");
}

function getSheet_(name, headers) {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sh.setFrozenRows(1);
  } else {
    // sheet made by an older version: add any new header columns at the end
    const have = sh.getLastColumn();
    if (have > 0 && have < headers.length) {
      sh.getRange(1, have + 1, 1, headers.length - have).setValues([headers.slice(have)]).setFontWeight("bold");
    }
  }
  return sh;
}

// Writes rows below the last used row. Adds sheet rows when needed (a new sheet only has 1000).
// textCols: 1-based column numbers to keep as plain text, or null for every column.
function appendBlock_(sh, lines, textCols) {
  const start = sh.getLastRow() + 1;
  const need = start + lines.length - 1;
  if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows());
  const width = lines[0].length;
  if (textCols === null) {
    sh.getRange(start, 1, lines.length, width).setNumberFormat("@");
  } else {
    textCols.forEach(function (c) { sh.getRange(start, c, lines.length, 1).setNumberFormat("@"); });
  }
  sh.getRange(start, 1, lines.length, width).setValues(lines);
}

function cell_(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return v;
}

function safeParse_(s, fallback) {
  try { return s ? JSON.parse(s) : fallback; } catch (e) { return fallback; }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
