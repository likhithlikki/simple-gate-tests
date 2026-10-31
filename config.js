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
*/
const CONFIG = {
  API_URL: "",
  IMAGE_BASE: "",

  MINUTES_PER_MARK: 1.8,                 // 100 marks = 180 minutes (3 hours)
  NEGATIVE_FOR_TYPES: ["MCQ"],           // question types that lose marks when wrong
};
