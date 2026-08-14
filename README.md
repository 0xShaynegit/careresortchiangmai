# Care Resort Chiang Mai

Static website for Care Resort Chiang Mai, a retirement and dementia care resort in
Mae Rim, Chiang Mai, Thailand.

## Build

No build step. Static HTML, CSS and self-hosted fonts. Serve the directory:

```
python -m http.server 8811
```

## Structure

```
index.html                      home
about-us.html                   dementia-alzheimers-care.html
long-stay.html                  short-stay.html
facilities.html                 for-family-members-friends.html
about-chiang-mai.html           photos.html
contact-us.html
privacy-policy.html             terms-and-conditions.html
disclaimer.html

assets/css/site.css             single stylesheet
assets/fonts/                   Newsreader, Source Sans 3, Noto Sans Thai (woff2)
assets/img/                     AVIF with WebP fallback
```

## Conventions

- **Zero external requests.** No CDN, no Google Fonts, no analytics, no embedded video.
  Everything is served from this directory. The privacy policy and disclaimer both state
  that no cookies are set and no third-party requests are made; keep it that way.
- **No JavaScript** beyond a `.js` class flag and the nav toggle. Nothing is hidden behind
  a script: if JS fails the page still reads.
- **Images** are AVIF with a WebP fallback, always with explicit `width` and `height`.
  Budgets: 200KB standard, 300KB hero.
- **Accessibility** is the brief, not a checkbox. 20px base type, 56px buttons, WCAG AA
  verified numerically, visible labels above form fields, keyboard operable throughout.
- **No pricing.** Fees are quoted individually. Do not add figures to any page.
- `<!-- TO CONFIRM: ... -->` comments mark facts awaiting the owner. Do not guess values.

## Status

Built, not yet reviewed in a browser. Legal pages have not been reviewed by a lawyer.
