/* Run from repository root: node tools/test_practice_upgrade.js */
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const subjectContext = { console, Math };
vm.createContext(subjectContext);
vm.runInContext(fs.readFileSync('subjects.js', 'utf8') + `
this.__practice = { TAXONOMY, LEGACY_TOPICS, TOPIC_TO_SUBJECT, SUBJECTS_BY_BRANCH, WEIGHT, SUBJECT_COUNTS, TYPE_SHARE, WEIGHTAGE_SOURCE, PATTERN, fullBlueprint, customBlueprint, spreadTopics, spreadTypes, spreadMarks, splitParts };
`, subjectContext);
const P = subjectContext.__practice;
const expectedSubjectCounts = { EC: 10, CS: 11, IT: 11, DA: 8, EE: 11, ME: 5, CE: 9 };
for (const [branch, count] of Object.entries(expectedSubjectCounts)) assert.strictEqual(Object.keys(P.TAXONOMY[branch]).length, count, `${branch} canonical subject count`);

for (const branch of Object.keys(P.TAXONOMY)) {
  const w = P.WEIGHT[branch];
  const c = P.SUBJECT_COUNTS[branch];
  assert.strictEqual(Object.values(w).reduce((a, b) => a + b, 0), 85, `${branch} weights must total 85`);
  assert.strictEqual(Object.values(c).reduce((a, x) => a + x.one, 0), 25, `${branch} one-mark core slots must total 25`);
  assert.strictEqual(Object.values(c).reduce((a, x) => a + x.two, 0), 30, `${branch} two-mark core slots must total 30`);
  for (const [subject, slots] of Object.entries(c)) assert.strictEqual(slots.one + 2 * slots.two, w[subject], `${branch} ${subject} slot marks must match WEIGHT`);
  assert(Math.abs(Object.values(P.TYPE_SHARE[branch]).reduce((a, b) => a + b, 0) - 1) < 1e-9, `${branch} type shares must total 1`);
  for (let i = 0; i < 1000; i++) {
    const b = P.fullBlueprint(branch);
    assert.strictEqual(b.length, 65);
    assert.strictEqual(b.reduce((a, q) => a + q.marks, 0), 100);
    assert.strictEqual(b.filter(q => q.marks === 1).length, 30);
    assert.strictEqual(b.filter(q => q.marks === 2).length, 35);
    assert.strictEqual(b.filter(q => q.subject === 'General Aptitude').length, 10);
    assert.strictEqual(b.filter(q => q.subject === 'General Aptitude' && q.type !== 'MCQ').length, 0);
    assert.strictEqual(b.filter(q => q.subject === 'General Aptitude' && q.topic === 'Verbal Ability').length, 4);
    assert.strictEqual(b.filter(q => q.subject === 'General Aptitude' && q.topic === 'Numerical Ability').length, 4);
    assert(b.some(q => q.subject === 'General Aptitude' && q.topic === 'Spatial Aptitude'));
    assert.strictEqual(b.map(q => q.slot).join(','), Array.from({ length: 65 }, (_, i) => i + 1).join(','));
  }
}


for (const branch of Object.keys(P.TAXONOMY)) {
  const dataBranch = branch === 'IT' ? 'IT' : branch;
  const dir = `data/${dataBranch}`;
  for (const file of fs.readdirSync(dir).filter(x => x.endsWith('.json'))) {
    const data = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf8'));
    for (const q of data.questions || []) {
      const topic = String(q.topic || '').trim();
      if (!topic) continue;
      assert(P.TOPIC_TO_SUBJECT[`${branch}|${topic.toLowerCase()}`], `${branch} topic is unmapped: ${topic}`);
    }
  }
}
assert.strictEqual(P.WEIGHTAGE_SOURCE.IT.proxy, true);
const weightageAnalysis = JSON.parse(fs.readFileSync('metadata/phase2-weightage-analysis.json', 'utf8'));
for (const branch of Object.keys(P.WEIGHT)) {
  assert.strictEqual(P.WEIGHTAGE_SOURCE[branch].source_branch, weightageAnalysis[branch].source_branch);
  assert.strictEqual(P.WEIGHTAGE_SOURCE[branch].paper_count, weightageAnalysis[branch].paper_sessions);
  assert.strictEqual(P.WEIGHTAGE_SOURCE[branch].mapped_questions, weightageAnalysis[branch].mapped_core_questions);
  assert.strictEqual(P.WEIGHTAGE_SOURCE[branch].unmapped_questions, weightageAnalysis[branch].unmapped_or_unlabelled_questions);
  for (const [subject, marks] of Object.entries(P.WEIGHT[branch])) assert.strictEqual(weightageAnalysis[branch].subject_marks_out_of_85[subject], marks);
  for (const [subject, counts] of Object.entries(P.SUBJECT_COUNTS[branch])) { assert.strictEqual(weightageAnalysis[branch].core_question_counts[subject].one, counts.one); assert.strictEqual(weightageAnalysis[branch].core_question_counts[subject].two, counts.two); }
}
const oldIndex = fs.readFileSync('backup-before-upgrade/index.html', 'utf8');
const oldTopicMatch = oldIndex.match(/const GP_SUBJECTS = (\{[\s\S]*?\});\s*\/\//);
assert(oldTopicMatch, 'pre-upgrade topic list should be present in backup');
const oldTopicLists = JSON.parse(oldTopicMatch[1]);
let oldTopicCount = 0;
for (const [branch, topics] of Object.entries(oldTopicLists)) for (const topic of topics) {
  oldTopicCount++;
  assert(P.TOPIC_TO_SUBJECT[`${branch}|${String(topic).trim().toLowerCase()}`], `legacy topic is unmapped: ${branch} / ${topic}`);
}
assert.strictEqual(oldTopicCount, 426, 'all original 426 topic labels must remain mapped');


const ten = Array.from({ length: 10 }, (_, i) => `Topic ${i + 1}`);
const tenOnce = P.spreadTopics(ten, 10);
assert.strictEqual(new Set(tenOnce).size, 10, '10 topics / 10 questions must not repeat');
const twentyFive = P.spreadTopics(ten, 25);
const counts = Object.fromEntries(ten.map(t => [t, twentyFive.filter(x => x === t).length]));
assert(Object.values(counts).every(n => n === 2 || n === 3), '10 topics / 25 questions must appear 2 or 3 times each');
const custom = P.customBlueprint({ branch: 'EC', subjects: ['Network Theory', 'Control Systems', 'Analog Electronics'], count: 12, types: 'mix', marks: 'mix' });
assert.strictEqual(custom.length, 12);
assert.strictEqual([...new Set(custom.map(q => q.subject))].sort().join('|'), ['Analog Electronics', 'Control Systems', 'Network Theory'].sort().join('|'), 'every chosen subject must appear when question count permits');
for (let i = 0; i < 1000; i++) {
  const branch = Object.keys(P.TAXONOMY)[i % Object.keys(P.TAXONOMY).length];
  const subjects = Object.keys(P.TAXONOMY[branch]).filter(x => x !== 'General Aptitude').slice(0, 3);
  const count = 3 + (i % 23);
  const types = ['mix', 'mcq', 'nat', 'mcqnat', 'mcqmsq'][i % 5];
  const marks = ['mix', '1', '2'][i % 3];
  const blueprint = P.customBlueprint({ branch, subjects, count, types, marks });
  assert.strictEqual(blueprint.length, count);
  if (count >= subjects.length) for (const subject of subjects) assert(blueprint.some(q => q.subject === subject), `${branch} custom blueprint omitted ${subject}`);
  if (types === 'mcq') assert(blueprint.every(q => q.type === 'MCQ'));
  if (types === 'nat') assert(blueprint.every(q => q.type === 'NAT'));
  if (marks === '1') assert(blueprint.every(q => q.marks === 1));
  if (marks === '2') assert(blueprint.every(q => q.marks === 2));
}
const nat = P.customBlueprint({ branch: 'EC', subjects: ['Network Theory'], count: 7, types: 'nat', marks: '2' });
assert(nat.every(q => q.type === 'NAT' && q.marks === 2));
const fullParts = P.splitParts(P.fullBlueprint('EC'), 17);
assert.strictEqual(fullParts.map(p => p.slots.length).join(','), '17,17,17,14');
const customParts = P.splitParts(P.customBlueprint({ branch: 'CS', count: 65 }), 20);
assert.strictEqual(customParts.map(p => p.slots.length).join(','), '20,20,20,5');

// Smoke-test the Apps Script practice backend with an in-memory Sheet stub.
const sheets = {};
function makeSheet(headers) {
  const sh = {
    rows: [headers.slice()],
    getLastRow() { return this.rows.length; },
    getRange(row, col, nRows, nCols) {
      return {
        getValues: () => Array.from({ length: nRows }, (_, r) => Array.from({ length: nCols }, (_, c) => (sh.rows[row - 1 + r] || [])[col - 1 + c] ?? '')),
        setValues: values => values.forEach((line, r) => {
          const at = row - 1 + r;
          if (!sh.rows[at]) sh.rows[at] = [];
          line.forEach((value, c) => { sh.rows[at][col - 1 + c] = value; });
        }),
      };
    },
  };
  return sh;
}
const backend = {
  console, Math, Date, Set, Map, Object, Array, Number, String, RegExp, JSON,
  getSheet_: (name, headers) => sheets[name] || (sheets[name] = makeSheet(headers)),
  appendBlock_: (sh, lines) => lines.forEach(line => sh.rows.push(line.slice())),
  safeParse_: (v, fallback) => { try { return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
};
vm.createContext(backend);
vm.runInContext(fs.readFileSync('gatepractise.gs', 'utf8') + `
this.__api = { gpUpload_, gpReadMeta_, gpReadByIds_, migrateGpSubjects, GP_QUESTIONS_TAB };
`, backend);
const B = backend.__api;
const valid = { subject: 'Network Theory', topic: 'Network Theorems', type: 'MCQ', marks: 1, question: 'A unique test question?', options: { A: 'a', B: 'b', C: 'c', D: 'd' }, answer: 'B', explanation: 'Because B.' };
const up = B.gpUpload_({ branch: 'EC', questions: [valid] });
assert.strictEqual(up.added, 1);
assert.strictEqual(B.gpReadMeta_().length, 1);
assert.strictEqual(B.gpReadByIds_([up.firstId])[0].question_type, 'MCQ');
const dup = B.gpUpload_({ branch: 'EC', questions: [valid] });
assert.strictEqual(dup.duplicates, 1);
const rejected = B.gpUpload_({ branch: 'EC', questions: [{ ...valid, subject: 'custom lower-case' }] });
assert.strictEqual(rejected.rejected.length, 1);
const customUp = B.gpUpload_({ branch: 'EC', allowCustom: true, questions: [{ ...valid, question: 'Another unique question?', subject: 'machine learning research' }] });
assert.strictEqual(customUp.added, 1);
assert.strictEqual(B.gpReadByIds_([customUp.firstId])[0].subject, 'Machine Learning Research');
const sh = sheets[B.GP_QUESTIONS_TAB];
sh.rows.push([ 'legacy-1', 'EC', 'Laplace Transform', '', 'MCQ', 1, 0.33, 'Legacy question', '{}', 'A', '', new Date(), 'ai' ]);
const migrated = B.migrateGpSubjects();
assert.strictEqual(migrated.updated, 1);
const migratedRow = sh.rows[sh.rows.length - 1];
assert.strictEqual(migratedRow[2], 'Signals and Systems');
assert.strictEqual(migratedRow[3], 'Laplace Transform');

assert.throws(() => B.gpUpload_({ branch: 'EC', questions: Array.from({ length: 101 }, () => valid) }), /100/);
console.log('PASS: taxonomy, 7 branch full-paper blueprints, 1,000 random runs per branch, custom spread, prompt splitting, upload validation, duplicate skipping, custom subject normalization and legacy migration.');
