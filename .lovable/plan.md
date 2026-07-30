# Add a back button to /cube

## What changes
Add a fixed exit button in the top-left of the cube page, matching the site-wide standard used by other full-screen experiences: `← BACK TO ZINETH`.

- Sits at top-left, fixed, above the letter animation.
- Styled in the page's own period-crude look: cream background, Federal blue text, 2px outset border, Times New Roman — same treatment as the existing "CUBE MODE" toggle in the bottom-right, so it reads as part of the page rather than modern UI.
- Clicking it goes back one step in browser history if the user arrived from within the site; otherwise it navigates to the home page.

## Technical detail
In `src/pages/CubePage.tsx`:
- Add a `.cube-back` rule to the inline `CSS` block mirroring `.cube-mode-toggle` (fixed, `top: 12px; left: 12px`, z-index 999, `:active` inset border).
- Render a `<button className="cube-back" data-interactive="true">` before the rant container.
- Handler: if `window.history.length > 1` call `navigate(-1)` (react-router `useNavigate`), else `navigate("/")`.
