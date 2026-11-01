/*
  Site settings. Edit this file only.

  API_URL
    The Web app URL (ends with /exec) from your Google Apps Script deployment (see Code.gs).
    Leave empty for demo mode (sample questions, stored in this browser only).

  IMAGE_BASE
    Where the "images" folder lives. Question JSON files contain exact paths such as
        images/questions/ce2021120_01.jpg
        images/options/ce2021120_A_01.jpg
    and the site loads  IMAGE_BASE + path.
      ""  (empty)  -> the images folder sits next to index.html in the same GitHub repo
                      (GitHub Pages: https://USER.github.io/REPO/images/...).
      "https://raw.githubusercontent.com/USER/REPO/main/"
                   -> the images folder is in a GitHub repo (any branch). Keep the trailing slash.
      "https://USER.github.io/REPO/"
                   -> the images folder is served by another GitHub Pages site.

  IMAGE_MAP
    The pictures in the repo sit in images/<branch>/<year>/ and many carry an older question
    numbering, so the path written in the data files is not where the picture is.
    image-map.json (made by  python tools/build_image_map.py ) lists where each one really is.
    Keep the file next to index.html. Run the tool again after you add or rename pictures.
    Set to "" to switch the map off (then images/<branch>/<year>/<same file name> is tried).
*/
const CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbwsxVByo9IKNlvZ16F3tsdwcB6fZ7w90xdF3Xx_hEV2kTkutfGOpCHStG3Eu6qASq6b/exec",
  IMAGE_BASE: "",
  IMAGE_MAP: "image-map.json",

  MINUTES_PER_MARK: 1.8,                 // 100 marks = 180 minutes (3 hours)
  NEGATIVE_FOR_TYPES: ["MCQ"],           // question types that lose marks when wrong
};
