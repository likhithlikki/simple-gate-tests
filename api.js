/*
  Data layer. The pages only talk to the backend through this file.

  BACKEND CONTRACT (implemented in Code.gs):
    GET  {API_URL}?action=meta      -> { meta: [ {id, exam, branch, year, subject, question_number, question_type, answer_format, marks}, ... ] }
    GET  {API_URL}?action=ids       -> { ids: ["id1", "id2", ...] }
    GET  {API_URL}?action=results   -> { results: [result, ...] }
    POST {API_URL} {action:"upload", rows:[row,...]}      -> { ok:true, added:n, skipped:n }   (existing ids are NOT overwritten)
    POST {API_URL} {action:"getByIds", ids:[...]}         -> { questions:[row,...] }
    POST {API_URL} {action:"saveResult", result:{...}}    -> { ok:true }
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
   Images. A question's "images" list holds exact paths from the JSON:
     images/questions/<id>_<n>.<ext>          -> shown under the question text
     images/options/<id>_<label>_<n>.<ext>    -> shown inside option <label>
   Every path is loaded from CONFIG.IMAGE_BASE + path (your GitHub images folder).
------------------------------------------------------------------- */
const IMG = {
  url(p) {
    p = String(p || "").trim();
    if (/^(https?:)?\/\//i.test(p)) return p;
    return (CONFIG.IMAGE_BASE || "") + p.replace(/^\.?\//, "").split("/").map(encodeURIComponent).join("/");
  },
  paths(q) { return (Array.isArray(q.images) ? q.images : []).filter(p => typeof p === "string" && p.trim()); },
  isOption(p) { return /(^|\/)options\//i.test(p); },
  forQuestion(q) { return IMG.paths(q).filter(p => !IMG.isOption(p)); },
  forOption(q, key) {
    const prefix = `${String(q.id).toLowerCase()}_${String(key).toLowerCase()}_`;
    return IMG.paths(q).filter(p => IMG.isOption(p) && p.split("/").pop().toLowerCase().startsWith(prefix));
  },
  el(path, cls) {
    const img = document.createElement("img");
    img.className = cls || "qimg";
    img.alt = "Figure";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.onerror = () => {
      const m = document.createElement("div");
      m.className = "imgmiss";
      m.textContent = "Image not found: " + path;
      img.replaceWith(m);
    };
    img.src = IMG.url(path);
    return img;
  },
};

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
