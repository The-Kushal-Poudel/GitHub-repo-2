# About section restore

The compact-spacing pass set `.about-reference-frame` to `min-height: auto`.
Because the About layout uses absolutely positioned children, that collapsed
the frame and visually removed the section.

Fixed by restoring a responsive minimum height while keeping the rest of the
compact section spacing unchanged.
