# EWP prototype — Release 1 vs. Future Release

Toggle between the pared-down first launch and the fuller future experience. Each has Desktop and Mobile.

| Prototype | What's in it |
|---|---|
| **Release 1** | Watch page + episode recipes. No save, share, or related carousels. |
| **Future Release** | Full page — related episodes, articles, save, and share. |

## Run

```bash
cd "prototypes/ewp-responsive"
python3 -m http.server 5174
```

Open http://localhost:5174

## Switch views

- Click **Release 1** / **Future Release** in the sticky bar
- Click **Desktop** / **Mobile** for viewport
- Keys: `1` / `2` for release, `D` / `M` for viewport
- Deep link: `?r=r1&v=desktop` or `?r=future&v=mobile`

## Shareable link

https://junnotjune.github.io/ewp-prototype/

(Push to that repo to update the published copy.)

## Source

- Desktop: Figma [`12182:13697`](https://www.figma.com/design/moqoPImGMRnwhRZ12JVbJF/-2026--Video-Series?node-id=12182-13697) — "4 recipes"
- Mobile: Figma [`12182:16614`](https://www.figma.com/design/moqoPImGMRnwhRZ12JVbJF/-2026--Video-Series?node-id=12182-16614) — "<764px"
- Release 1 scope: `product/first-launch-scope-alignment.md`

## Notes

- Images and icons in `assets/` are exported from the Figma frames.
- NYT typefaces aren't licensed for this prototype. Stand-ins: Source Serif 4 for Cheltenham, Source Sans 3 for Franklin, Zilla Slab for Karnak.
- The player is a real YouTube embed of ["How to Use Your Spring CSA Veggies"](https://www.youtube.com/watch?v=NzDK4S4PCCk). Needs a network connection. Design controls (fullscreen / mute / CC) drive the player via the YouTube IFrame API.
