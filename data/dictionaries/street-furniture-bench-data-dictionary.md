# Street Furniture - Bench Data Dictionary

**Source:** open.toronto.ca/dataset/street-furniture-bench
**Publisher:** Transportation Services, City of Toronto
**License:** Open Government Licence – Toronto
**Refresh cycle:** Semi-annually
**Contact:** Sandro.Tersigni@toronto.ca

Locations of public benches installed under the City's 20-year public-private partnership with Astral Out-of-Home (est. 2007), which manufactures, owns, cleans, and maintains this street furniture on the City's behalf.

## Resource: Street Furniture - Bench Data

**Format:** GeoJSON (`FeatureCollection`)
**Coordinate reference system:** CRS84 (WGS84), coordinates ordered `[longitude, latitude]`
**Geometry type:** `MultiPoint`; every feature contains exactly one coordinate pair, located at `geometry.coordinates[0]`
**Records:** 2,256

| Field | Type | Nullable | Description |
|---|---|---|---|
| `_id` | integer | No | Sequential row identifier |
| `OBJECTID` | integer | No | Source ArcGIS object identifier |
| `ID` | string | No | Unique asset identifier (e.g., `"BE-00103"`) |
| `ADDRESSNUMBERTEXT` | string | 6.8% missing | Street number of the nearest address |
| `ADDRESSSTREET` | string | 5.9% missing | Street name of the nearest address |
| `FRONTINGSTREET` | string | No | The street the bench faces/fronts onto |
| `SIDE` | string | No | Side of `FRONTINGSTREET` the bench is on: North, South, East, or West |
| `FROMSTREET` | string | No | Nearest cross-street, used as a positional reference point |
| `DIRECTION` | string | No | Direction from `FROMSTREET`: North, South, East, West, or (rarely) `Opposite` |
| `SITEID` | string | 0.2% missing | Internal site identifier |
| `WARD` | string | No | Two-digit zero-padded ward number (`"01"`–`"25"`), stored as text; all 25 wards represented |
| `BIA` | string | 68.4% missing | Business Improvement Area name, when the bench falls within one. 77 distinct BIAs represented |
| `ASSETTYPE` | string | No | Bench type: `Standard` (1,478) or `Mini` (778) |
| `STATUS` | string | No | `Existing` (2,042) or `Temporarily Removed` (214), see Data Quality Notes |
| `BARCODE` | string | 3.0% missing | Physical asset barcode |
| `SDE_STATE_ID` | null | 100% empty | Present in schema, always JSON `null`. Uses a different null representation than `BIA`, see Data Quality Notes |

## Location Description Convention

Bench position is described relationally rather than by address : `FRONTINGSTREET` + `SIDE` gives the street and side the bench sits on, `FROMSTREET` + `DIRECTION` gives a cross-street reference point and which way from it the bench is located. `ADDRESSNUMBERTEXT` + `ADDRESSSTREET` is a separate, simpler nearest-address pair, not always present, and not guaranteed to describe the same location.

## Data Quality Notes

**`STATUS` includes benches that are not currently physically present.** 214 of 2,256 records (9.5%) are marked `"Temporarily Removed"`.

**Two different missing-value conventions coexist in this file.** `BIA` uses the literal string `"None"` for missing values (a string, same field type as when populated). `SDE_STATE_ID` uses JSON `null` instead, and does so for every single record.

**Coverage reflects a specific contractual program.** Per the publisher's description, this dataset covers only street furniture installed under the Astral Out-of-Home agreement (up to 2,500 benches contractually). Benches installed through other means (parks-specific furniture, other City programs, private installations) are not included here.

## Licensing

Open Government Licence – Toronto.
