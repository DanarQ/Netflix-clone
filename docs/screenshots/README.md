# Screenshot gallery

Captured from the running local application on 2026-09-09 using Chromium at 1440 × 900. These are actual interface captures, not mockups. YouTube preview frames can differ between sessions.

| File | Screen | How to reproduce |
| --- | --- | --- |
| `home.png` | Video hero and first catalog row | Open `/` and wait for the preview and images to load. |
| `catalog.png` | Series, films, and animation rows | Use the **Tv Shows** navigation link. |
| `mini-player.png` | Floating player over the home screen | Open `/watch/interstellar`, play the trailer, then minimize it. |
| `profiles.png` | Profile management | Open `/manage-profiles`. |

To refresh, run `bun run dev`, use the same viewport, and replace the matching PNG. Inspect each capture before committing: avoid loading placeholders, error overlays, or personal browser UI. Keep filenames stable because the root README links to them.
