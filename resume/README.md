# Resume — single source of truth

The **master resume** is the Word document Suneel shares with recruiters:

```
/Users/MAC/Downloads/Documents/Resume/SuneelBikkasani - Sr. Java Fullstack Developer.docx
```

Everything else mirrors it. **Never edit the PDF or the website copy directly** — they are
generated from the master.

## How to update the resume

1. **Edit the master `.docx` first** (open in Word/LibreOffice, make the change).
2. **Regenerate the website PDF** from the master:
   ```bash
   ./resume/sync-resume.sh
   ```
   This exports the `.docx` → `public/resume.pdf` via LibreOffice (faithful Calibri layout,
   preserves the clickable Credly certification links).
3. **Mirror the same change into `src/data.js`** — the site renders experience/skills from
   this structured file, so keep it consistent with the master (it's a condensed view).
4. **Build & deploy:**
   ```bash
   npm run build
   git add -A && git commit -m "resume: <what changed>" && git push
   ```
   GitHub Actions rebuilds and publishes to https://suneelkumarbikkasani.com.

## Requirements

- LibreOffice (`brew install --cask libreoffice`) — provides `soffice` for `.docx` → PDF.

## Why this setup

- One source of truth (the `.docx`) → the resume a recruiter receives and the one on the
  website are always the same document.
- No parallel/orphaned resume files to drift out of sync.
