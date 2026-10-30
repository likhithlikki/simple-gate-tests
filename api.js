/*
  Data layer. The pages only talk to the backend through this file.

  BACKEND CONTRACT (implemented in Code.gs):
    GET  {API_URL}?action=meta      -> { meta: [ {id, exam, branch, year, subject, question_number, question_type, answer_format, marks}, ... ] }
    GET  {API_URL}?action=ids       -> { ids: ["id1", "id2", ...] }
    GET  {API_URL}?action=results   -> { results: [result, ...] }
    POST {API_URL} {action:"upload", rows:[row,...]}      -> { ok:true, added:n, skipped:n }   (existing ids are NOT overwritten)
    POST {API_URL} {action:"getByIds", ids:[...]}         -> { questions:[row,...] }
    POST {API_URL} {action:"saveResult", result:{...}}    -> { ok:true }

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
    o.year = Number(r.year);
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

  async function get(action) {
    const res = await fetch(`${CONFIG.API_URL}?action=${action}`);
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

    async saveResult(result) {
      if (demo()) { const list = LS.get("demo_results", []); list.push(result); LS.set("demo_results", list); return { ok: true }; }
      return post({ action: "saveResult", result });
    },

    async getResults() {
      if (demo()) return LS.get("demo_results", []);
      return (await get("results")).results;
    },
  };
})();

// Image helper: tries images/<id>.png, .jpg, .jpeg, .webp in order
function questionImage(id) {
  const img = document.createElement("img");
  const exts = [...CONFIG.IMAGE_EXTS];
  const next = () => {
    const e = exts.shift();
    if (!e) { img.remove(); return; }
    img.src = `${CONFIG.IMAGE_DIR}${encodeURIComponent(id)}.${e}`;
  };
  img.onerror = next;
  img.alt = "Question figure";
  img.className = "qimg";
  next();
  return img;
}
