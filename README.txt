IMAGE FIX - copy these files into the ROOT of your GitHub repo (same level as index.html), replacing the old ones:

  api.js                    (image lookup rewritten)
  config.js                 (new setting IMAGE_MAP; your API_URL is kept)
  exam.html                 (passes the question to the image lookup)
  upload.html               (the image checker now uses the same lookup)
  image-map.json            (NEW - tells the site where every picture really is)
  image-map-report.txt      (NEW - what was matched / not matched, for you to read)
  tools/build_image_map.py  (NEW - rebuilds image-map.json)

Your images folder stays exactly as it is. Nothing is renamed or moved.

After you add or rename pictures:
    python tools/build_image_map.py
then upload the new image-map.json (and image-map-report.txt).

If you ever rename the picture files so every name matches its question, delete image-map.json
and set IMAGE_MAP: "" in config.js so the names are used directly.
