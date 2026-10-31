# GATE question-bank recovery report

## Result

The existing branch/year bank has been enriched using the supplied full-mirror extraction package and its local image assets. The original 15,110 question IDs and 155 branch/year JSON files were preserved.

## Question and answer recovery

| Metric | Count |
|---|---:|
| Existing questions matched to source IDs | 15,110 / 15,110 |
| MCQ answers mapped to option labels | 11,955 |
| MSQ answers mapped to option-label arrays | 379 |
| NAT accepted numerical ranges | 2,776 |
| Objective answer/option-text mismatches | 0 |

MCQ and MSQ option indices were mapped to labels and checked against the source option text. All 12,334 objective answers matched their corresponding option text.

NAT values remain machine-readable intervals in `numerical_answer`; they were not flattened into guessed single answers.

## Solution recovery

| Solution status | Questions |
|---|---:|
| Text solution available | 9,517 |
| External-link-only placeholder | 4,531 |
| HTML-only solution | 70 |
| No solution text or HTML | 992 |
| **Total** | **15,110** |

The extracted HTML, including links, is preserved as `explanation_html`. Link destinations are also listed in `solution_links`. The 4,531 external-link-only entries are not treated as worked explanations.

## Image recovery

### Question and option images

| Image classification | Questions |
|---|---:|
| No question/option image reference | 11,407 |
| Question image only | 3,700 |
| Option image only | 0 |
| Both question and option images | 3 |

| Local image status | Questions |
|---|---:|
| All question/option image refs have a verified local asset | 3,663 |
| Some, but not all, are locally available | 0 |
| Image reference exists but no verified local file was copied | 40 |

Curated image files copied:
- Question images: 3,843
- Option images: 9
- Solution images: 2
- Total curated image files: 3,854

The raw source image folder is retained under `images/source/GATE/` with 3,634 files. The image source map records original references and unresolved candidate paths.

Only exact-path or exam-context-verified local paths were copied into the question/option/solution image folders. Filename-only candidates were deliberately not used because the audit shows that a unique filename can point to a different branch/year.

### Solution image references

There are 3,338 unique solution image references across 2,690 questions:
- 2 have verified local files.
- 3,215 have no local filename match.
- 87 have filename-only candidates that were not trusted.
- 34 are ambiguous.

Unresolved references are preserved in `image-source-map.json` and `image-recovery-review.csv`.

## Full-mirror reconciliation

The patched full-mirror file contains 46,279 rows and 15,140 unique source IDs. 30 unique source IDs are outside the current 15,110-question bank; they are preserved separately in `extra-source-ids-review.json` and were not silently inserted.

Repeated source-page variants were checked. Conflict details are in `mirror-conflicts.csv`. The current normalized question bank remains the canonical text/options source; extracted answer/solution values were matched to the supplied source records.

## Validation and caveats

- All 15,110 current question IDs are preserved and unique.
- All 155 branch/year JSON files are preserved.
- All objective answer labels match their source option text.
- NAT accepted ranges are retained without inventing point values.
- Answers are extractor-provided and are not independently verified against official GATE answer keys.
- Question numbers retain the existing generated sequence; they are not certified as original paper question numbers.
- `has_images`/`image_type` describe question-statement and option images. Solution images are in `solution_images`.

See `README.txt`, `manifest.json`, `image-source-map.json`, `image-recovery-review.csv`, `solution-review.csv`, and `mirror-conflicts.csv` inside the archive.
