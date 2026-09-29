# Hero Fullscreen Fix

The actual Hero component uses `hero-reference-section`, `hero-reference-wrap`, and `hero-reference-frame`.
These are now forced to true full-viewport dimensions:

- `width: 100vw`
- `height/min-height: 100svh`
- no section padding
- no max-width container
- no rounded outer frame
- no border/shadow around the hero
- header floats above the hero

All existing hero content and functionality are unchanged.
