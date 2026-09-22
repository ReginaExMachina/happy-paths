# Contributing to Happy Paths

Thanks for taking a look. This is a small civic project, so this doc stays short on purpose.

## Before you start

Please read `CODE_OF_CONDUCT.md`. Participation in this project means agreeing to it.

## Getting set up

You need a local server, not just opening `index.html` directly, since the map won't load over `file://`.

```
git clone <repo-url>
cd happy-paths
python3 -m http.server
```

Visit `http://localhost:8000`. Any local server works (VS Code's Live Server extension, npx serve, etc.)

## Ways to help

The data model is not stable yet, so adding individual strolls by hand isn't a useful contribution right now, anything added to `js/strolls-data.js` in its current shape will likely need to be redone once the real structure lands. Here's where the work is:

- **Evaluate data sources.** Several open datasets are being assessed for whether they're usable (StrollTO, OpenStreetMap, Wikidata, others), see `data/` for what's been surveyed so far, including known data quality issues per source. Opening and checking a dataset against what's documented there, or checking one not yet covered, is useful right now.
- **Categorization.** The current sample strolls are a handful of nearby points with no sense of theme, the goal is landmarks tagged by category (art, nature, heritage, etc.) so strolls can be built by neighbourhood *and* theme, not just proximity. Help is needed figuring out where that categorization comes from (a source dataset that already has it, or a scheme built on top of one that doesn't) and how it should be structured.
- **App logic.** `js/app.js` handles rendering, the map, and interaction. See "Known issues" in the README before assuming something is a new bug, a couple of things are already tracked.
- **Design/theming.** `css/theme.css` holds only color and font variables, see the README's "How theming works" section before proposing a new look, it's meant to be swappable without touching `css/main.css`.

If you're not sure whether something is ready to work on, open an issue and ask before sinking time into it.

## Making a change

1. Open an issue first for anything nontrivial (new features, data source changes, design direction), small fixes and typo corrections can be a pull request.
2. Keep pull requests focused, one change per pull request is much easier to review than several bundled together.
3. Describe what you changed and why in the pull request description.

## Data licensing

Some sources require attribution, and combining OpenStreetMap data into this project's merged dataset carries a share-alike obligation under ODbL. When adding a new data source check that its license terms fit the project's.

## Code style

Nothing enforced by tooling yet. Match the existing style in whichever file you're editing: 2-space indentation, no semicolon-omission tricks, descriptive variable names over clever ones. An `.editorconfig` is in the repo root to keep indentation consistent.

## Questions

Open an issue and tag it as a question, or start a discussion if the repo has that enabled.