// ---------- Settings you can change ----------
const CONFIG = {
  // Leave empty for DEMO MODE (everything is kept in this browser only).
  // Later, paste your Google Apps Script web-app URL here.
  API_URL: "https://script.google.com/macros/s/AKfycbwsxVByo9IKNlvZ16F3tsdwcB6fZ7w90xdF3Xx_hEV2kTkutfGOpCHStG3Eu6qASq6b/exec",

  // Question images live in this folder, named <question id>.<ext>
  IMAGE_DIR: "images/",
  IMAGE_EXTS: ["png", "jpg", "jpeg", "webp"],

  // 65 questions (100 marks) = 3 hours  ->  1.8 minutes per mark
  MINUTES_PER_MARK: 180 / 100,

  // Negative marking is applied only to these question types
  NEGATIVE_FOR_TYPES: ["MCQ"],
};
