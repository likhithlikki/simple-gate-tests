#!/usr/bin/env python3
"""
Builds  image-map.json  for the website.

WHY
  The question JSON files say where a picture should be, for example
      images/questions/ec2017126_01.jpg
  but in the repo the pictures sit in  images/<branch>/<year>/  and, for papers with several
  sets (SET-1, SET-2 ...), many files carry an older question numbering (set 1 shifted by a
  few numbers, set 2 starting again from 1). This script matches every picture to the
  question it really belongs to, so no file has to be renamed or moved.

HOW
  For every branch + year + set it compares the question numbers that need a picture
  (from data/*/*.json) with the numbers found in the file names, finds the shift that makes
  them line up, and writes  { "<path in JSON>": "<real path in repo>" }.
  Anything it cannot match with confidence is left out (the exam then shows
  "Image not found" instead of a wrong picture) and is listed in image-map-report.txt.

USAGE   (run from the repo root, Python 3.8+, no extra packages)
      python tools/build_image_map.py
  Run it again whenever you add or rename pictures, then upload the new image-map.json.
"""
import json, glob, os, re, sys, collections

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
os.chdir(ROOT)
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp")
ID_RE = re.compile(r"^([a-z]{2})(\d{4})(\d)(\d+)$")        # branch, year, set digit, question no.
SUFFIX_RE = re.compile(r"^(.*?)((?:_[a-d])?_\d+)$")          # id + (_A)?_NN


def split_name(path):
    """'images/ec/2017/ec2017126_01.jpg' -> ('ec2017126', '_01')   /  option: ('ec2017126', '_A_01')"""
    stem = os.path.splitext(os.path.basename(path))[0].lower()
    m = SUFFIX_RE.match(stem)
    return (m.group(1), m.group(2)) if m else (stem, "")


def parse_id(i):
    m = ID_RE.match(i)
    return (m.group(1), int(m.group(2)), int(m.group(3)), int(m.group(4))) if m else None


# ---- what the questions expect -------------------------------------------------------------
expected = collections.defaultdict(lambda: collections.defaultdict(dict))   # group -> qn -> {suffix: json path}
for f in sorted(glob.glob("data/*/*.json")):
    d = json.load(open(f, encoding="utf-8"))
    if not isinstance(d, dict) or "questions" not in d:
        continue
    for q in d["questions"]:
        for p in q.get("images") or []:
            base, suf = split_name(p)
            k = parse_id(base)
            if k:
                expected[k[:3]][k[3]][suf] = p

# ---- what is in the folders ----------------------------------------------------------------
found = collections.defaultdict(lambda: collections.defaultdict(dict))      # group -> qn -> {suffix: real path}
skipped_files = []
for r, _, fs in os.walk("images"):
    for fn in fs:
        if not fn.lower().endswith(EXTS):
            continue
        path = os.path.join(r, fn).replace("\\", "/")
        base, suf = split_name(path)
        k = parse_id(base)
        parts = path.split("/")
        # only trust files that sit in images/<branch>/<year>/ of their own branch and year
        ok = k and len(parts) == 4 and parts[1] == k[0] and (parts[2] == str(k[1]) or (k[1] == 0 and parts[2] == "unmapped"))
        if not ok:
            skipped_files.append(path)
            continue
        found[k[:3]][k[3]][suf] = path

# ---- find the shift(s) for every group -------------------------------------------------------
mapping, report = {}, []
total_refs = sum(len(s) for g in expected.values() for s in g.values())
for g in sorted(set(expected) | set(found)):
    exp, fil = dict(expected.get(g, {})), dict(found.get(g, {}))
    left_f, left_e = set(fil), set(exp)
    shifts = []
    while left_f and left_e:
        best = max(range(-140, 141), key=lambda d: (len({x + d for x in left_f} & left_e), -abs(d)))
        hit = {x for x in left_f if x + best in left_e}
        first = not shifts
        # first shift: needs to explain most files; extra shifts (e.g. a different run for the GA questions): stricter
        if len(hit) < (1 if first else 3) or len(hit) < (0.5 if first else 0.7) * len(left_f):
            break
        for x in hit:
            for suf, real in fil[x].items():
                ref = exp[x + best].get(suf)
                if ref:
                    mapping[ref] = real
        shifts.append((best, len(hit)))
        left_f -= hit
        left_e -= {x + best for x in hit}
    unresolved_refs = sum(len(exp[x]) for x in left_e)
    if shifts or left_f or left_e:
        report.append(f"{g[0].upper()} {g[1]} set {g[2]}: shifts {shifts or 'none'}; "
                      f"{len(left_f)} file(s) unused, {unresolved_refs} picture(s) without a file")

# ---- write results ---------------------------------------------------------------------------
mapping = dict(sorted(mapping.items()))
with open("image-map.json", "w", encoding="utf-8") as fh:
    json.dump(mapping, fh, separators=(",", ":"))
lines = [f"questions expect {total_refs} picture file(s); matched {len(mapping)}; "
         f"{total_refs - len(mapping)} have no matching file in images/.",
         f"{len(skipped_files)} file(s) were ignored because they are not in images/<branch>/<year>/ of their own branch and year.",
         ""] + report
open("image-map-report.txt", "w", encoding="utf-8").write("\n".join(lines))
print("\n".join(lines[:3]))
print("details: image-map-report.txt   |   map: image-map.json")
