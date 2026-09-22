# happy-paths

A web app that suggests pleasant walking routes in Toronto for the current month, pulled from the City's open data. Inspired by StrollTO and a local walking group built around the idea of third spaces.

**Status:** early prototype. The map and month picker work; the underlying data is a small hardcoded sample, not yet fed from a full dataset.

## Running it locally

You need a local server, not opening `index.html` directly, since the map won't load over `file://`.

```
git clone <repo-url>
cd happy-paths
python3 -m http.server
```

Visit `http://localhost:8000`. Any local server works (VS Code's Live Server extension, npx serve, etc.)

## File structure

```
happy-paths/
├── index.html                # markup, links the CSS and JS below
├── css/
│   ├── main.css              # layout, components
│   └── theme.css             # color variables and fonts only, swap this file to re-theme the app
├── js/
│   ├── strolls-data.js       # the formatted stroll content
│   └── app.js                # map setup, rendering, and all interaction logic
├── data/                     # reference material
│   ├── dictionaries/         # draft versions of data dictionaries for relevant open datasets
│   ├── fetched/
│   ├── processed/
│   └── raw/
├── tools/                    # scrappers and data fetchers
│   ├── ckan.py
│   ├── fetch_osm_toronto.py
│   └── fetch_wikidata_toronto.py
├── .editorconfig
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE                   # GNU General Public License (code)
└── LICENSE-DATA              # Open Database License (merged geographic data)
```

## How theming works

`css/theme.css` holds CSS custom properties, background, ink, and a set of `--route-N` / `--route-N-deep` color pairs used for the map lines and legend. `css/main.css` never hardcodes a color, it only references these variables. To try a different look, swap in a different `theme.css` with the same variable names.

This is sample data only, not a stable format. The current strolls are a handful of nearby points grouped by proximity, with no category or theme. The real goal is landmarks tagged by type (art, nature, heritage, etc.) pulled from evaluated open data sources, so strolls can be built by neighbourhood and theme instead.

For reference, the current (temporary) shape in js/strolls-data.js:

{
  id: "kebab-case-id",
  title: "Display Name",
  ward: "Ward name(s)",
  walkTime: "about NN min walk",
  desc: "One paragraph describing the stroll.",
  stops: [
    { t: "Stop title", d: "One or two sentences about it.", ll: [lat, lon] },
    // ...
  ],
  route: [ [lat, lon], [lat, lon], /* ... */ ]  // the actual walking path, one point per vertex
}

route is a real path along the sidewalk/trail network (computed via the City's Pedestrian Network data), not a straight line between stops. Nothing in app.js refers to a stroll by name, colors and map layers are assigned by each stroll's position in the array, so adding, removing, or reordering entries here is safe on its own.

Month-based filtering isn't implemented yet, every month currently shows the same full list. That logic lives entirely in one function, getStrollsForMonth() in app.js, which is the only place that needs to change once real filtering is ready.

## Data sources

- **[StrollTO](https://open.toronto.ca/dataset/strollto/)** and **[Pedestrian Network Data](https://open.toronto.ca/dataset/pedestrian-network/)**, City of Toronto, Open Government Licence – Toronto. See `docs/strollto-data-dictionary.md` and `docs/pednet-data-dictionary.md` for field-level detail.
- Map tiles: OpenStreetMap, © OpenStreetMap contributors, Open Database License.

Attribution requirements and how they apply to the merged dataset are documented in `docs/data-attribution-plan.md`.

## Licensing

Code is licensed under the GNU General Public License, see `LICENSE`. The merged geographic dataset (once it exists as a build artifact) is licensed under the Open Database License, see `LICENSE-DATA`, this is required by OpenStreetMap's own terms for any derivative database built from its data. Code and data are separate works under separate licenses..

## Known issues

- Switching months causes an unwanted zoom animation and the stop markers briefly render larger than intended. Root cause not yet fixed.
- Month selection doesn't actually filter strolls yet, see `getStrollsForMonth()` above.
- Data is a hardcoded sample of 3 strolls, not the full merged dataset.

## Contributing

See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.