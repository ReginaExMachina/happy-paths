# Contributing to Happy Paths

Thanks for taking a look. This is a small civic project, so this doc stays short on purpose.

## Before you start

Please read `CODE_OF_CONDUCT.md`. Participation in this project means agreeing to it.

## Getting set up

No build step, no dependencies to install. You need a local server, not just opening `index.html` directly, since the map won't load over `file://`.

```
git clone <repo-url>
cd happy-paths
python3 -m http.server
```

Visit `http://localhost:8000`. Any local server works (VS Code's Live Server extension, npx serve, etc.)

## Ways to help

- **Add a stroll.** The data shape is documented in `js/strolls-data.js` and in the README. This is the easiest way to contribute and doesn't require touching any app logic.
- **Data pipeline work.** Scripts that pull from OpenStreetMap, Wikidata, and other sources live in `scripts/`. See `docs/` for what's been surveyed so far and the known quirks of each source.
- **App logic.** `js/app.js` handles rendering, the map, and interaction. See "Known issues" in the README before assuming something is a new bug, a couple of things are already tracked.
- **Design/theming.** `css/theme.css` holds only color variables, see the README's "How theming works" section before proposing a new look, it's meant to be swappable without touching `css/main.css`.

## Making a change

1. Open an issue first for anything nontrivial (new features, data source changes, design direction), small fixes and typo corrections can just be a pull request.
2. Keep pull requests focused, one change per PR is much easier to review than several bundled together.
3. Test your change by actually running the app locally (see above), not just reading the diff.
4. If you're changing `js/strolls-data.js`, make sure the JSON-like structure stays valid, a syntax error there breaks the whole app silently.
5. Describe what you changed and why in the PR description. "Fixes the thing" isn't enough context for someone reviewing without the same background you have.

## Data licensing

If your contribution touches data pulled from an external source (OpenStreetMap, Wikidata, another City of Toronto dataset, etc.), read `docs/data-attribution-plan.md` first. Some sources require attribution, and combining OpenStreetMap data into this project's merged dataset carries a share-alike obligation under ODbL. Don't add a new data source without checking its license terms fit the project's.

## Code style

Nothing enforced by tooling yet. Match the existing style in whichever file you're editing: 2-space indentation, no semicolon-omission tricks, descriptive variable names over clever ones. An `.editorconfig` is in the repo root to keep indentation consistent automatically.

## Questions

Open an issue and tag it as a question, or start a discussion if the repo has that enabled.
