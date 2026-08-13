# EWP prototype — desktop vs. mobile

The Episode Watch Page for The Veggie at two breakpoints, in separate tabs.

| Tab | Breakpoint | Figma frame |
|---|---|---|
| **Desktop** | 1280px | [`12182:13697`](https://www.figma.com/design/moqoPImGMRnwhRZ12JVbJF/-2026--Video-Series?node-id=12182-13697) — "4 recipes" |
| **Mobile** | 375px | [`12182:16614`](https://www.figma.com/design/moqoPImGMRnwhRZ12JVbJF/-2026--Video-Series?node-id=12182-16614) — "<764px" |

## Run

```bash
cd "prototypes/ewp-responsive"
python3 -m http.server 5174
```

Open http://localhost:5174

## Switch views

- Click **Desktop** / **Mobile** in the sticky bar
- Or press `D` / `M`
- Deep link: `?v=desktop` or `?v=mobile`

Desktop renders at a fixed 1280px and scrolls horizontally in a narrow window. Mobile renders at 375px in a device frame.

## Notes

- Images and icons in `assets/` are exported straight from the Figma frames.
- NYT typefaces aren't licensed for this prototype. Stand-ins: Source Serif 4 for Cheltenham, Source Sans 3 for Franklin, Zilla Slab for Karnak. Type sizes, weights, and spacing match the design.
- The player is a real YouTube embed of ["How to Use Your Spring CSA Veggies"](https://www.youtube.com/watch?v=NzDK4S4PCCk), so it needs a network connection. It uses YouTube's own controls rather than the mocked fullscreen/mute/CC buttons in the Figma frame.
- Everything else is a static comp — the carousels and buttons don't do anything.
