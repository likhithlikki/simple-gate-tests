# TASK-19 — Fixes after review

1. **Question types**: the single dropdown is replaced by MCQ / MSQ / NAT checkboxes (any combination, at least one stays ticked). `spreadTypes()` accepts an array and keeps the usual proportions among the chosen types.
2. **EC weightage**: raw PYQ mapping gave Analog 3 / Network 6 / Maths 17 / EDC 15. EC marks were re-calibrated by hand to
   Maths 13, Network 9, EDC 8, Analog 9, Digital 9, Signals 9, Communications 11, EM 8, Control 9 (= 85).
   Counts keep one + 2*two = marks, 25 one-mark + 30 two-mark. This is a manual calibration, not recomputed from the data folder; change `WEIGHT.EC` / `SUBJECT_COUNTS.EC` in `subjects.js` if you disagree.
3. **Overlapping topics**: `TOPIC_ALIASES` + `gpBlueprintTopics()` merge same-meaning topics and drop catch-all topics named like their subject, for the Create picker, custom tests and full tests. `TAXONOMY` / `TOPIC_TO_SUBJECT` are untouched, so old rows and the backend still map.
4. **General Aptitude**: now 5 one-mark then 5 two-mark; topic mix varies per paper (2-3 verbal in one-mark; spatial + logical/analytical + numerical + one flexible in two-mark). All MCQ.
5. **IT**: stays on the CS pattern (GATE has no separate IT paper since 2014); the full-test screen now says so.

Checks: 500 full-paper runs per branch (65 Q, 30x1, 35x2, 100 marks, 10 GA, GA one-mark first) all pass.
Backup of the previous `subjects.js` / `index.html`: `backup-before-v2/`.
Not changed: `gatepractise.gs`, `Code.gs`, `api.js`, `exam.html`. Backend needs no redeploy.
