# Nyxor — Portfolio

Static bento-style portfolio: plain HTML + CSS + JavaScript, no framework, no build step.

## Structure

```text
├── index.html     page
├── 404.html       not-found page
├── style.css      styles
├── script.js      music player
├── favicon.svg
├── robots.txt
├── vercel.json    headers (CSP) + cleanUrls
└── assets/
    ├── avatar.jpg
    └── music.mp3
```

## Edit

- Profile, links, quote: `index.html`
- Playlist: `playlist` array at the top of `script.js` (use files in `assets/`; external URLs are blocked by the CSP in `vercel.json` unless you add their domain to `media-src`).
- Bump `?v=` on `style.css` links after changing the styles to bypass browser cache.

## Run locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

## Deploy (Vercel)

Import the GitHub repo, framework preset **Other**, no build command. Every `git push` redeploys.
