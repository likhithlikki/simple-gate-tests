/*
  Data layer. The pages only talk to the backend through this file.

  BACKEND CONTRACT (implemented in Code.gs):
    GET  {API_URL}?action=meta      -> { meta: [ {id, exam, branch, year, subject, question_number, question_type, answer_format, marks}, ... ] }
    GET  {API_URL}?action=ids       -> { ids: ["id1", "id2", ...] }
    GET  {API_URL}?action=results   -> { results: [result, ...] }
    POST {API_URL} {action:"upload", rows:[row,...]}      -> { ok:true, added:n, skipped:n }   (existing ids are NOT overwritten)
    POST {API_URL} {action:"getByIds", ids:[...]}         -> { questions:[row,...] }
    POST {API_URL} {action:"saveResult", result:{...}}    -> { ok:true }
    GET  {API_URL}?action=gpMeta                          -> { meta: [ {id, branch, subject, topic, type, marks}, ... ] }   (gatepractise.gs)
    POST {API_URL} {action:"gpGetByIds", ids:[...]}       -> { questions:[row,...] }                                       (gatepractise.gs)
    POST {API_URL} {action:"gpUpload", branch, questions} -> { ok, added, duplicates, rejected, firstId, lastId }          (gatepractise.gs)
    POST {API_URL} {action:"register", name, email, photo?, confirmRename?}
                                                          -> { ok:true, name, email, photo } or { conflict:true, oldName }
    GET  {API_URL}?action=results&email=...               -> only that candidate's results

  With API_URL empty, everything is stored in localStorage (demo mode, about 5 MB max).
*/
const API = (() => {
  const demo = () => !CONFIG.API_URL;
  const LS = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set: (k, v) => {
      try { localStorage.setItem(k, JSON.stringify(v)); }
      catch (e) { throw new Error("Demo storage is full (about 5 MB). Set API_URL in config.js to use your Google Sheet, which has no such limit."); }
    },
  };
  const META_FIELDS = ["id", "exam", "branch", "year", "subject", "question_number", "question_type", "answer_format", "marks"];

  const parseMaybe = (v, fallback) => {
    if (v === null || v === undefined || v === "") return fallback;
    if (typeof v !== "string") return v;
    try { return JSON.parse(v); } catch { return v; }
  };

  function normalize(r) {
    const o = { ...r };
    o.year = /^\d+$/.test(String(r.year).trim()) ? Number(r.year) : String(r.year || "Unmapped");
    o.marks = Number(r.marks) || 1;
    o.negative_marks = Number(r.negative_marks) || 0;
    o.question_type = String(r.question_type || "").toUpperCase();
    if ("options" in r) o.options = parseMaybe(r.options, null);
    if ("images" in r) o.images = parseMaybe(r.images, []) || [];
    if ("answer" in r) o.answer = (r.answer === "" || r.answer === undefined) ? null : r.answer;
    return o;
  }

  const SAMPLE = [
    ["MCQ", "Digital Circuits", 2020, 1, 1, "How many 2-input NAND gates are needed to build a 2-input AND gate?", { A: "1", B: "2", C: "3", D: "4" }, "B"],
    ["MCQ", "Digital Circuits", 2020, 2, 1, "A flip-flop that toggles on every clock when J = K = 1 is a:", { A: "SR", B: "JK", C: "D", D: "Latch" }, "B"],
    ["NAT", "Digital Circuits", 2020, 3, 2, "A 10-bit D/A converter is calibrated over 0 to 10 V. For input 13A (hex), the output in volts (3 decimals) is ______.", null, "3.056"],
    ["MSQ", "Digital Circuits", 2019, 4, 2, "Which of these are universal gates?", { A: "NAND", B: "NOR", C: "XOR", D: "AND" }, "A;B"],
    ["MCQ", "Signals and Systems", 2019, 5, 1, "The Fourier transform of a unit impulse is:", { A: "0", B: "1", C: "delta(w)", D: "1/jw" }, "B"],
    ["NAT", "Signals and Systems", 2020, 6, 1, "The period of cos(2*pi*t/5) in seconds is ______.", null, "5"],
    ["MCQ", "Network Theory", 2019, 7, 2, "Time constant of a series RC circuit is:", { A: "R/C", B: "RC", C: "1/RC", D: "R+C" }, "B"],
    ["MCQ", "Network Theory", 2020, 8, 1, "Question with no answer key in the sheet (not scored):", { A: "x", B: "y", C: "z", D: "w" }, null],
  ].map(([t, s, y, n, m, q, o, a]) => ({
    id: `demo-${y}-q${n}`, exam: "GATE", branch: "EC", year: y, subject: s, question_number: n,
    question_type: t, answer_format: t === "NAT" ? "numeric" : "option", marks: m, negative_marks: t === "MCQ" ? +(m / 3).toFixed(2) : 0,
    exam_label: `GATE EC ${y}`, question: q, options: o, answer: a, explanation: null, images: [], source_page: "", answer_status: a ? "ok" : "missing",
  }));

  function demoRows() {
    let rows = LS.get("demo_questions", null);
    if (!rows) { rows = SAMPLE; LS.set("demo_questions", rows); }
    return rows;
  }

  function demoSave(result) {
    const list = LS.get("demo_results", []);
    const at = result.attemptId ? list.findIndex(r => r.attemptId === result.attemptId) : -1;
    if (at >= 0) list[at] = result; else list.push(result);
    LS.set("demo_results", list);
  }

  async function get(action, extra) {
    const res = await fetch(`${CONFIG.API_URL}?action=${action}${extra || ""}`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return checked(await res.json());
  }
  async function post(body) {
    const res = await fetch(CONFIG.API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return checked(await res.json());
  }
  // Apps Script always answers 200, so errors come back as { error: "..." }
  function checked(data) { if (data && data.error) throw new Error(data.error); return data; }

  return {
    isDemo: demo,
    normalize,

    // light list used by the setup page (no question text)
    async getMeta() {
      if (demo()) return demoRows().map(r => normalize(Object.fromEntries(META_FIELDS.map(f => [f, r[f]]))));
      return (await get("meta")).meta.map(normalize);
    },

    async getIds() {
      if (demo()) return demoRows().map(r => String(r.id));
      return (await get("ids")).ids.map(String);
    },

    // full questions for one exam, returned in the same order as ids
    async getQuestionsByIds(ids) {
      let list;
      if (demo()) { const set = new Set(ids); list = demoRows().filter(r => set.has(r.id)).map(normalize); }
      else list = (await post({ action: "getByIds", ids })).questions.map(normalize);
      const map = new Map(list.map(q => [String(q.id), q]));
      const ordered = ids.map(id => map.get(String(id))).filter(Boolean);
      if (ordered.length !== ids.length) throw new Error("Some questions could not be loaded. Try again.");
      return ordered;
    },

    // Insert only: an id that already exists is skipped, never overwritten.
    async uploadQuestions(rows) {
      if (demo()) {
        const all = demoRows().filter(r => !String(r.id).startsWith("demo-"));
        const seen = new Set(all.map(r => String(r.id)));
        let added = 0, skipped = 0;
        rows.forEach(r => { if (seen.has(String(r.id))) skipped++; else { seen.add(String(r.id)); all.push(r); added++; } });
        LS.set("demo_questions", all);
        return { ok: true, added, skipped };
      }
      return post({ action: "upload", rows });
    },

    // Insert, or update the same attempt (attemptId) so progress saves and the final save share one row.
    async saveResult(result) {
      if (demo()) { demoSave(result); return { ok: true }; }
      return post({ action: "saveResult", result });
    },

    // For when the page is closing: fire-and-forget, survives tab close.
    saveResultBeacon(result) {
      if (demo()) { try { demoSave(result); } catch {} return; }
      const body = JSON.stringify({ action: "saveResult", result });
      try { if (navigator.sendBeacon && navigator.sendBeacon(CONFIG.API_URL, new Blob([body], { type: "text/plain;charset=UTF-8" }))) return; } catch {}
      try { fetch(CONFIG.API_URL, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body }).catch(() => {}); } catch {}
    },

    async getResults(email) {
      email = String(email || "").trim().toLowerCase();
      if (demo()) return LS.get("demo_results", []).filter(r => String(r.email || "").toLowerCase() === email);
      return (await get("results", "&email=" + encodeURIComponent(email))).results;
    },

    /* ---------- GATE practice questions (made with an AI, not previous-year papers) ---------- */
    // light list for the "take a practice test" form: [{id, branch, subject, topic, type, marks}]
    async gpGetMeta() {
      if (demo()) return LS.get("demo_gp", []).map(q => ({ id: q.id, branch: q.branch, subject: q.subject, topic: q.topic, type: q.question_type, marks: q.marks }));
      return (await get("gpMeta")).meta;
    },
    // full questions, same order as ids
    async gpGetQuestions(ids) {
      let list;
      if (demo()) { const set = new Set(ids); list = LS.get("demo_gp", []).filter(q => set.has(q.id)).map(normalize); }
      else list = (await post({ action: "gpGetByIds", ids })).questions.map(normalize);
      const map = new Map(list.map(q => [String(q.id), q]));
      const ordered = ids.map(id => map.get(String(id))).filter(Boolean);
      if (ordered.length !== ids.length) throw new Error("Some questions could not be loaded. Try again.");
      return ordered;
    },
    // Insert only. Server answers { ok, added, duplicates, rejected:[{n,reason}], firstId, lastId }.
    async gpUpload(branch, questions) {
      if (!demo()) return post({ action: "gpUpload", branch, questions });
      const all = LS.get("demo_gp", []);
      const seen = new Set(all.filter(q => q.branch === branch).map(q => q.question.toLowerCase().replace(/\s+/g, " ").trim()));
      let n = all.filter(q => q.branch === branch).length, added = 0, duplicates = 0;
      const ids = [];
      questions.forEach(q => {
        const k = String(q.question).toLowerCase().replace(/\s+/g, " ").trim();
        if (seen.has(k)) { duplicates++; return; }
        seen.add(k); n++;
        const type = String(q.type).toUpperCase();
        let answer = type === "NAT" ? String(q.answer ?? "") : String(Array.isArray(q.answer) ? q.answer.join(";") : q.answer).toUpperCase();
        if (type === "NAT" && q.answer_min != null && q.answer_max != null && +q.answer_min !== +q.answer_max) answer = `${q.answer_min} to ${q.answer_max}`;
        all.push({
          id: branch + String(n).padStart(4, "0"), exam: "GATE", branch, year: "Practice", subject: q.subject, topic: q.topic || "",
          question_type: type, answer_format: type === "NAT" ? "numeric" : "option", marks: Number(q.marks),
          negative_marks: type === "MCQ" ? (q.negative_marks ?? +(q.marks / 3).toFixed(2)) : 0, question: q.question,
          options: type === "NAT" ? null : q.options, answer, explanation: q.explanation || "", images: [],
        });
        ids.push(all[all.length - 1].id); added++;
      });
      LS.set("demo_gp", all);
      return { ok: true, added, duplicates, rejected: [], ids, firstId: ids[0] || "", lastId: ids[ids.length - 1] || "" };
    },

    // Candidate details. Email is saved in lower case. Name is only for show, never verified.
    // Same email + different name -> { conflict:true, oldName } until called again with confirmRename:true.
    async register({ name, email, photo, confirmRename }) {
      name = String(name || "").trim().replace(/\s+/g, " ");
      email = String(email || "").trim().toLowerCase();
      if (!name || !email) throw new Error("Please enter your name and email.");
      if (demo()) {
        const users = LS.get("demo_users", {});
        const old = users[email];
        const norm = x => x.toLowerCase();
        if (old && norm(old.name) !== norm(name) && !confirmRename) return { conflict: true, oldName: old.name };
        users[email] = { name, photo: photo || (old && old.photo) || "" };
        LS.set("demo_users", users);
        return { ok: true, name, email, photo: users[email].photo };
      }
      return post({ action: "register", name, email, photo: photo || "", confirmRename: !!confirmRename });
    },
  };
})();

// Section rule for the exam: only two sections, General Aptitude and the branch core. No subject names shown.
const isGASubject = s => /general aptitude|aptitude|^\s*ga\s*$|verbal|numerical ability|analytical|quantitative|spatial|logical/i.test(String(s || ""));
const sectionName = q => isGASubject(q.subject) ? "General Aptitude" : `${String(q.branch || "Branch").toUpperCase()} Core`;

/* ------------------------------------------------------------------
   Images. A question's "images" list holds paths written by the data files:
     images/questions/<id>_<n>.<ext>          -> shown under the question text
     images/options/<id>_<label>_<n>.<ext>    -> shown inside option <label>
   Those paths are only names. In the repo the pictures sit in  images/<branch>/<year>/  and
   many of them carry an older numbering (papers with several sets). image-map.json says where
   each picture really is:   { "<path in the data>": "<real path in the repo>" }
   It is made by  tools/build_image_map.py  (see config.js -> IMAGE_MAP). Nothing has to be
   renamed or moved. Every real path is loaded from CONFIG.IMAGE_BASE + path.
------------------------------------------------------------------- */
const IMG = {
  map: null,            // loaded image-map.json, or null when switched off / not found
  loaded: false,
  _p: null,
  EXTS: [".jpg", ".webp", ".png", ".jpeg", ".gif", ".bmp"],

  // Starts loading the map once. Await IMG.load() before anything that must be exact.
  load() {
    if (!IMG._p) {
      IMG._p = (async () => {
        try {
          if (CONFIG.IMAGE_MAP) {
            const r = await fetch(CONFIG.IMAGE_MAP, { cache: "no-cache" });
            if (r.ok) { const m = await r.json(); if (m && typeof m === "object") IMG.map = m; }
          }
        } catch (e) { /* no map: the folder layout is used instead */ }
        IMG.loaded = true;
      })();
    }
    return IMG._p;
  },

  src(p) {
    p = String(p || "").trim();
    if (/^(https?:)?\/\//i.test(p)) return p;
    return (CONFIG.IMAGE_BASE || "") + p.replace(/^\.?\//, "").split("/").map(encodeURIComponent).join("/");
  },

  // Places to look, best first.
  //  1. where image-map.json says the picture is
  //  2. the path exactly as written in the data (lets you drop a corrected file there)
  //  3. only when the map is switched off (IMAGE_MAP: ""): images/<branch>/<year>/<same file name>, with other extensions too
  // With a map, a name that is not in it is NOT looked up by file name in the branch/year folder: that file
  // can belong to another question, and a wrong picture is worse than a missing one.
  candidates(path, q) {
    const p = String(path || "").trim();
    if (/^(https?:)?\/\//i.test(p)) return [p];
    const out = [];
    if (IMG.map && IMG.map[p]) out.push(IMG.map[p]);
    out.push(p);
    if (!IMG.map && !CONFIG.IMAGE_MAP && q && q.branch) {
      const br = String(q.branch).toLowerCase();
      const yr = /^\d{4}$/.test(String(q.year)) ? String(q.year) : "unmapped";
      const file = p.split("/").pop(), stem = file.replace(/\.[^.]+$/, "");
      [file, ...IMG.EXTS.map(e => stem + e)].forEach(f => out.push(`images/${br}/${yr}/${f}`));
    }
    return [...new Set(out)].map(IMG.src);
  },

  url(p, q) { return IMG.candidates(p, q)[0]; },

  paths(q) { return (Array.isArray(q.images) ? q.images : []).filter(p => typeof p === "string" && p.trim()); },
  isOption(p) { return /(^|\/)options\//i.test(p); },
  forQuestion(q) { return IMG.paths(q).filter(p => !IMG.isOption(p)); },
  forOption(q, key) {
    const prefix = `${String(q.id).toLowerCase()}_${String(key).toLowerCase()}_`;
    return IMG.paths(q).filter(p => IMG.isOption(p) && p.split("/").pop().toLowerCase().startsWith(prefix));
  },

  // An <img> that tries each place in turn and shows "Image not found" only when all fail.
  el(path, cls, q) {
    const img = document.createElement("img");
    img.className = cls || "qimg";
    img.alt = "Figure";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    let list = [], n = 0;
    const next = () => {
      if (n < list.length) { img.src = list[n++]; return; }
      const m = document.createElement("div");
      m.className = "imgmiss";
      m.textContent = "Image not found: " + path;
      img.replaceWith(m);
    };
    img.onerror = next;
    const start = () => { list = IMG.candidates(path, q); next(); };
    if (IMG.loaded) start(); else IMG.load().then(start);
    return img;
  },
};
if (typeof window !== "undefined" && typeof fetch === "function") IMG.load();

/* ------------------------------------------------------------------
   Text. Question text can contain [latex]...[/latex]; everything else is
   plain text (so things like <stdio.h> show as typed). Needs KaTeX on the
   page (exam.html loads it); without it the raw formula is shown.
------------------------------------------------------------------- */
function fixTex(tex) {
  tex = String(tex).trim();
  // Some formulas were double-escaped (\\lt, \\Delta). A "\\" right before a known command name is not a line break.
  // Only known names are touched, so real row breaks such as "x+y=1 \\ax-ay=5" stay as they are.
  if (!/\\begin\{/.test(tex)) tex = tex.replace(DOUBLE_ESCAPED, "\\$1");
  return tex;
}
const DOUBLE_ESCAPED = /\\\\(lt|gt|le|ge|leq|geq|ne|neq|infty|pm|mp|times|cdot|approx|to|rightarrow|Delta|delta|alpha|beta|gamma|theta|lambda|mu|pi|sigma|omega|Omega|phi|epsilon|rho|tau|partial|nabla|sum|int|frac|sqrt|text|dot|ddot|hat|vec|bar)(?![A-Za-z])/g;
function texNode(tex) {
  const span = document.createElement("span");
  span.className = "tex";
  tex = fixTex(tex);
  if (window.katex) {
    try { window.katex.render(tex, span, { throwOnError: false, strict: "ignore", output: "html" }); return span; }
    catch (e) { /* fall through to raw text */ }
  }
  span.textContent = tex;
  return span;
}
function richText(el, s) {
  s = String(s ?? "");
  el.textContent = "";
  const re = /\[latex\]([\s\S]*?)\[\/latex\]/gi;
  let last = 0, m;
  while ((m = re.exec(s))) {
    if (m.index > last) el.append(s.slice(last, m.index));
    el.append(texNode(m[1]));
    last = re.lastIndex;
  }
  if (last < s.length) el.append(s.slice(last));
}

/* ------------------------------------------------------------------
   Importer: turns an uploaded JSON file into sheet rows (no DOM, no network).
   Accepts the GATE format:  { exam, branch, year, subject, questions: [ {id, topic, images, ...} ] }
   and the older shapes (list of such objects, or one flat list of questions).
------------------------------------------------------------------- */
const Importer = (() => {
  const text = v => (v === null || v === undefined) ? "" : String(v);
  // files that sit next to the question files but hold no questions
  const SIDE_FILES = /(^|\/)(manifest|source-metadata|image-source-map)\.json$/i;

  function labelParts(s) {
    const m = String(s || "").match(/^\s*([A-Za-z]+)\s+([A-Za-z]+)\s+(\d{4})\s*$/);
    return m ? { exam: m[1], branch: m[2], year: +m[3] } : {};
  }

  // returns [{ ctx, q }]
  function extract(data) {
    const out = [];
    const block = b => {
      if (!b || !Array.isArray(b.questions)) return false;
      b.questions.forEach(q => out.push({ ctx: b, q }));
      return true;
    };
    if (Array.isArray(data)) {
      data.forEach(item => { if (!block(item) && item && typeof item === "object" && "question" in item) out.push({ ctx: {}, q: item }); });
    } else block(data);
    return out;
  }

  function build({ ctx, q }) {
    const errs = [];
    const lab = labelParts(q.exam);
    const exam = ctx.exam || lab.exam || (q.exam && !/\s/.test(q.exam) ? q.exam : "");
    const branch = text(q.branch || ctx.branch || lab.branch).trim() || "UNKNOWN";            // file with no branch -> UNKNOWN
    const year = q.year || ctx.year || lab.year || "Unmapped";                                  // file with no year  -> Unmapped
    // topic filter + exam sections come from the question's own "topic"
    const subject = text(q.topic).trim() || text(q.subject).trim() ||
      ("topic" in q ? "Unclassified" : text(ctx.subject).trim());
    const type = String(q.question_type || "").toUpperCase();
    const id = text(q.id).trim();

    if (!id) errs.push("no id");
    if (!["MCQ", "MSQ", "NAT"].includes(type)) errs.push(`question_type must be MCQ, MSQ or NAT (got "${text(q.question_type)}")`);
    if (!(Number(q.marks) > 0)) errs.push("marks must be a number above 0");
    const hasImages = Array.isArray(q.images) && q.images.some(p => typeof p === "string" && p.trim());
    if (!text(q.question).trim() && !hasImages) errs.push("question text is empty and there is no image");
    if (!exam) errs.push("exam is missing");
    if (!/^\d{4}$/.test(String(year)) && year !== "Unmapped") errs.push("year must have 4 digits");
    if (!subject) errs.push("topic/subject is missing");
    if (type === "MCQ" || type === "MSQ") {
      const o = q.options;
      const n = !o ? 0 : Array.isArray(o) ? o.length : Object.keys(o).length;
      if (n < 2) errs.push(`${type} needs at least 2 options (this one has ${n}; if it is really a numeric question, set question_type to NAT)`);
    }
    if (errs.length) return { id, errs };

    const images = (Array.isArray(q.images) ? q.images : []).filter(p => typeof p === "string" && p.trim());
    return {
      id, errs,
      row: {
        id, exam, branch, year: /^\d{4}$/.test(String(year)) ? Number(year) : "Unmapped", subject,
        question_number: q.question_number ?? "",
        question_type: type,
        answer_format: q.answer_format || (type === "NAT" ? "numeric" : "option"),
        marks: Number(q.marks),
        negative_marks: Number(q.negative_marks) || 0,
        exam_label: /\s/.test(text(q.exam)) ? q.exam : `${exam} ${branch} ${year}`,
        question: text(q.question),
        options: q.options ? JSON.stringify(q.options) : "",
        answer: Array.isArray(q.answer) ? q.answer.join(";") : text(q.answer),
        explanation: text(q.explanation),
        images: JSON.stringify(images),
        source_page: text(q.source_page),
        answer_status: text(q.answer_status),
      },
    };
  }
  return { text, SIDE_FILES, labelParts, extract, build };
})();
