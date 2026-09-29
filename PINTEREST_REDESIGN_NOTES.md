# Pinterest / Editorial Redesign

This redesign keeps the existing portfolio content and routes, while replacing the public homepage UI.

## Implemented direction

- Floating pill navigation inspired by the supplied header reference
- Framed cyber/editorial hero with indexed rail, grid surface, large background typography, profile dossier, cutout portrait, project peek and scroll cue
- Editorial About section with large portrait crop and oversized outline typography
- Archive/gallery Tech Stack section
- Overlapping auto-moving project poster cards; hover pauses the motion
- Career section redesigned as a technical dossier rather than a standard timeline
- Featured editorial blog card plus smaller note cards
- Editorial contact form using the existing API/mailto behavior
- Layered wave footer using the same sage/ink/accent visual system
- Crystal KP logo added as an optimized WebP asset

## Content

`src/data/portfolioData.js` and `src/data/cmsSnapshot.json` were intentionally left unchanged. Mark Instantly remains the e-signature project; no separate eSign project was introduced.

## Run

Use Node 24, then:

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```
