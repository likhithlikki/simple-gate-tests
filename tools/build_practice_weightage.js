/* Recompute metadata/phase2-weightage-analysis.json from the bundled PYQ JSON files. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const context = {};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'subjects.js'), 'utf8') + '\nthis.__taxonomy={TAXONOMY,LEGACY_TOPICS};', context);
const { TAXONOMY, LEGACY_TOPICS } = context.__taxonomy;
const root = path.resolve(__dirname, '..');

// 71 DA questions have no topic label in the supplied JSON; their question text was reviewed and mapped here.
const DA_TOPIC_OVERRIDES = {
  da202404:'Programming, Data Structures and Algorithms',da202405:'Calculus and Optimization',da202406:'Programming, Data Structures and Algorithms',da2024011:'Programming, Data Structures and Algorithms',da2024013:'Artificial Intelligence',da2024015:'Artificial Intelligence',da2024016:'Database Management and Warehousing',da2024018:'Programming, Data Structures and Algorithms',da2024019:'Artificial Intelligence',da2024020:'Programming, Data Structures and Algorithms',da2024021:'Database Management and Warehousing',da2024022:'Programming, Data Structures and Algorithms',da2024023:'Machine Learning',da2024027:'Calculus and Optimization',da2024030:'Programming, Data Structures and Algorithms',da2024034:'Artificial Intelligence',da2024035:'Programming, Data Structures and Algorithms',da2024036:'Database Management and Warehousing',da2024040:'Calculus and Optimization',da2024041:'Programming, Data Structures and Algorithms',da2024042:'Programming, Data Structures and Algorithms',da2024044:'Artificial Intelligence',da2024045:'Database Management and Warehousing',da2024050:'Calculus and Optimization',
  da202504:'Calculus and Optimization',da202505:'Artificial Intelligence',da202506:'Database Management and Warehousing',da202507:'Database Management and Warehousing',da202508:'Programming, Data Structures and Algorithms',da2025014:'Calculus and Optimization',da2025016:'Artificial Intelligence',da2025017:'Programming, Data Structures and Algorithms',da2025019:'Programming, Data Structures and Algorithms',da2025022:'Calculus and Optimization',da2025023:'Database Management and Warehousing',da2025033:'Artificial Intelligence',da2025034:'Artificial Intelligence',da2025036:'Database Management and Warehousing',da2025039:'Calculus and Optimization',da2025041:'Calculus and Optimization',da2025046:'Database Management and Warehousing',da2025047:'Database Management and Warehousing',da2025048:'Programming, Data Structures and Algorithms',da2025049:'Calculus and Optimization',da2025052:'Database Management and Warehousing',da2025055:'Programming, Data Structures and Algorithms',
  da202603:'Artificial Intelligence',da202604:'Artificial Intelligence',da202605:'Programming, Data Structures and Algorithms',da202607:'Database Management and Warehousing',da202608:'Database Management and Warehousing',da2026014:'Artificial Intelligence',da2026015:'Programming, Data Structures and Algorithms',da2026016:'Database Management and Warehousing',da2026017:'Calculus and Optimization',da2026020:'Artificial Intelligence',da2026021:'Programming, Data Structures and Algorithms',da2026022:'Database Management and Warehousing',da2026023:'Probability and Statistics',da2026025:'Probability and Statistics',da2026028:'Artificial Intelligence',da2026030:'Programming, Data Structures and Algorithms',da2026031:'Database Management and Warehousing',da2026032:'Database Management and Warehousing',da2026033:'Database Management and Warehousing',da2026038:'Artificial Intelligence',da2026039:'Programming, Data Structures and Algorithms',da2026041:'Database Management and Warehousing',da2026049:'Database Management and Warehousing',da2026050:'Database Management and Warehousing',da2026051:'Database Management and Warehousing'
};
function allocate(entries, total) {
  const sum = entries.reduce((a, x) => a + x.value, 0);
  const rows = entries.map(x => ({ ...x, raw: sum ? x.value / sum * total : 0, allocated: sum ? Math.floor(x.value / sum * total) : 0 }));
  let left = total - rows.reduce((a, x) => a + x.allocated, 0);
  rows.sort((a, b) => (b.raw - b.allocated) - (a.raw - a.allocated));
  for (let i = 0; i < left; i++) rows[i % rows.length].allocated++;
  return rows;
}
function allocateCapped(entries, total, caps) {
  const allocation = Object.fromEntries(entries.map(x => [x.key, 0]));
  let remaining = total;
  let active = entries.filter(x => (caps[x.key] || 0) > 0).map(x => x.key);
  while (remaining > 0 && active.length) {
    const preferenceTotal = active.reduce((sum, key) => sum + Math.max(0.01, entries.find(x => x.key === key).value), 0);
    const raw = Object.fromEntries(active.map(key => [key, remaining * Math.max(0.01, entries.find(x => x.key === key).value) / preferenceTotal]));
    const saturated = active.filter(key => raw[key] >= (caps[key] - allocation[key]));
    if (saturated.length) {
      for (const key of saturated) { const take = caps[key] - allocation[key]; allocation[key] += take; remaining -= take; }
      active = active.filter(key => !saturated.includes(key));
      continue;
    }
    const floors = Object.fromEntries(active.map(key => [key, Math.floor(raw[key])]));
    for (const key of active) { allocation[key] += floors[key]; remaining -= floors[key]; }
    const order = active.slice().sort((a, b) => (raw[b] - floors[b]) - (raw[a] - floors[a]));
    for (const key of order) { if (!remaining) break; if (allocation[key] < caps[key]) { allocation[key]++; remaining--; } }
    break;
  }
  if (remaining) throw new Error(`Cannot allocate ${total} two-mark slots under the subject mark caps.`);
  return allocation;
}
const result = {};
for (const branch of Object.keys(TAXONOMY)) {
  const sourceBranch = branch === 'IT' ? 'CS' : branch;
  const mappingBranch = sourceBranch;
  const topicMap = {};
  for (const [subject, topics] of Object.entries(TAXONOMY[mappingBranch])) for (const topic of topics) topicMap[topic.trim().toLowerCase()] = subject;
  for (const topic of LEGACY_TOPICS[mappingBranch] || []) topicMap[topic.trim().toLowerCase()] = 'Other / Legacy Topics';
  const papers = [];
  const dataDir = path.join(root, 'data', sourceBranch);
  for (const file of fs.readdirSync(dataDir).filter(x => x.endsWith('.json'))) {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    const year = Number(data.year);
    if (year < 2019 || year > 2026) continue;
    const groups = {};
    for (const q of data.questions || []) (groups[String(q.variant || '').trim() || 'PAPER'] ||= []).push(q);
    for (const [variant, questions] of Object.entries(groups)) papers.push({ year, variant, questions });
  }
  const subjects = Object.keys(TAXONOMY[mappingBranch]).filter(x => x !== 'General Aptitude');
  const subjectMarks = Object.fromEntries(subjects.map(x => [x, 0]));
  const ones = Object.fromEntries(subjects.map(x => [x, 0]));
  const twos = Object.fromEntries(subjects.map(x => [x, 0]));
  const typeCounts = { MCQ: 0, MSQ: 0, NAT: 0 };
  let mapped = 0, unmapped = 0, legacy = 0, gaQuestions = 0, gaMarks = 0, manual = 0;
  for (const paper of papers) {
    const paperMarks = Object.fromEntries(subjects.map(x => [x, 0]));
    const paperOnes = Object.fromEntries(subjects.map(x => [x, 0]));
    const paperTwos = Object.fromEntries(subjects.map(x => [x, 0]));
    for (const q of paper.questions) {
      let subject = topicMap[String(q.topic || '').trim().toLowerCase()];
      if (!subject && branch === 'DA' && DA_TOPIC_OVERRIDES[q.id]) { subject = DA_TOPIC_OVERRIDES[q.id]; manual++; }
      if (!subject) { unmapped++; continue; }
      if (subject === 'Other / Legacy Topics') { legacy++; continue; }
      const marks = Number(q.marks) || 1;
      if (subject === 'General Aptitude') { gaQuestions++; gaMarks += marks; continue; }
      if (!Object.prototype.hasOwnProperty.call(paperMarks, subject)) { unmapped++; continue; }
      mapped++; paperMarks[subject] += marks;
      if (marks === 1) paperOnes[subject]++;
      if (marks === 2) paperTwos[subject]++;
      const type = String(q.question_type || '').toUpperCase();
      if (typeCounts[type] !== undefined) typeCounts[type]++;
    }
    const total = Object.values(paperMarks).reduce((a, b) => a + b, 0);
    if (total) for (const subject of subjects) subjectMarks[subject] += paperMarks[subject] / total * 85;
    for (const subject of subjects) { ones[subject] += paperOnes[subject]; twos[subject] += paperTwos[subject]; }
  }
  const weights = allocate(subjects.map(key => ({ key, value: subjectMarks[key] })), 85);
  const weightMap = Object.fromEntries(weights.filter(x => x.allocated > 0).map(x => [x.key, x.allocated]));
  // Reconcile per-subject 1/2-mark counts so each subject's slot marks equal WEIGHT exactly.
  const twoPrefs = subjects.map(key => ({ key, value: twos[key] }));
  const twoCaps = Object.fromEntries(Object.entries(weightMap).map(([key, marks]) => [key, Math.floor(marks / 2)]));
  const twoAllocated = allocateCapped(twoPrefs, 30, twoCaps);
  const countMap = Object.fromEntries(Object.entries(weightMap).map(([key, marks]) => [key, { one: marks - 2 * twoAllocated[key], two: twoAllocated[key] }]));
  const typeTotal = Object.values(typeCounts).reduce((a, b) => a + b, 0);
  const typeShare = Object.fromEntries(Object.entries(typeCounts).map(([key, value]) => [key, typeTotal ? value / typeTotal : 0]));
  result[branch] = {
    source_branch: sourceBranch, years: [...new Set(papers.map(p => p.year))].sort(), paper_sessions: papers.length,
    mapped_core_questions: mapped, unmapped_or_unlabelled_questions: unmapped, legacy_questions_excluded: legacy,
    general_aptitude_questions: gaQuestions, general_aptitude_marks_observed: gaMarks,
    manual_DA_topic_classifications: manual, uses_proxy_data: branch === 'IT',
    subject_marks_out_of_85: weightMap, core_question_counts: countMap, core_type_share: typeShare
  };
}
const output = path.join(root, 'metadata', 'phase2-weightage-analysis.json');
fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
const pct = n => (n * 100).toFixed(1) + '%';
const report = [
  '# Phase 2 — PYQ-derived subject weightage', '',
  '## Method', '',
  '- Source: branch/year JSON files included in this repository, restricted to 2019–2026. The external Google Sheets `Questions` tab was not included in the uploaded archive and was not queried.',
  '- Each paper/session is counted once. Where a year has `SET-1` and `SET-2`, they are treated as separate sessions and averaged equally.',
  '- For each session, mapped core subject marks are normalized to an 85-mark core; subject shares are averaged across sessions and rounded by largest remainder.',
  '- The 30 two-mark core slots are allocated using observed subject-level two-mark frequencies, capped at `floor(subject weight / 2)`. Remaining subject marks become 1-mark slots. This guarantees `one + 2 × two = subject weight` for every subject and exact 25/30 core slot totals.',
  '- General Aptitude is fixed at 15 marks: five 1-mark and five 2-mark questions. Core MCQ/MSQ/NAT shares are calculated from mapped core questions.', '',
  '## Coverage and qualifications', '',
  '- IT has no 2019–2026 IT paper files in the archive (the local IT folder contains only older 2004–2008 material). IT therefore uses the CS 2019–2026 distribution as an explicit proxy.',
  '- DA contains 71 questions with blank topic labels. Those questions were manually classified from question text using the question-ID overrides in this script; this is a review-based inference, not a source-provided label.',
  '- CE has 28 unlabelled questions excluded from subject-weight calculations. EC has three miscellaneous legacy questions excluded; EE has two miscellaneous legacy questions excluded; CS and ME each have one unlabelled question excluded.',
  '- EC 2019 and 2020 source files do not carry recognizable GA topic labels; GA remains fixed at the 15-mark blueprint.',
  '- These are empirical estimates from the supplied archive, not a guarantee of the next GATE paper’s subject distribution. Review them when the question bank is refreshed.', ''
];
for (const [branch, data] of Object.entries(result)) {
  const excluded = data.unmapped_or_unlabelled_questions + data.legacy_questions_excluded;
  report.push(`## ${branch}`, '', `Source branch: **${data.source_branch}**; sessions: **${data.paper_sessions}**; years: ${data.years.join(', ')}; mapped core questions: **${data.mapped_core_questions}**; GA questions: **${data.general_aptitude_questions}**; excluded/unmapped: **${excluded}**.`, '', '| Subject | Core marks | 1-mark questions | 2-mark questions |', '|---|---:|---:|---:|');
  for (const [subject, marks] of Object.entries(data.subject_marks_out_of_85)) {
    const c = data.core_question_counts[subject];
    report.push(`| ${subject} | ${marks} | ${c.one} | ${c.two} |`);
  }
  report.push('', `Core totals: **${Object.values(data.subject_marks_out_of_85).reduce((a,b) => a+b,0)} marks**, **${Object.values(data.core_question_counts).reduce((a,c) => a+c.one,0)} one-mark**, **${Object.values(data.core_question_counts).reduce((a,c) => a+c.two,0)} two-mark**.`, '', '| Type | Share |', '|---|---:|');
  for (const [type, share] of Object.entries(data.core_type_share)) report.push(`| ${type} | ${pct(share)} |`);
  report.push('');
}
const reportPath = path.join(root, 'metadata', 'phase2-weightage-report.md');
fs.writeFileSync(reportPath, report.join('\n') + '\n');
console.log(`Wrote ${path.relative(root, output)} and ${path.relative(root, reportPath)} for ${Object.keys(result).length} branches.`);
