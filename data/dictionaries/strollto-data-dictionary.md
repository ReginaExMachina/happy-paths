# StrollTO Data Dictionary

**Source:** open.toronto.ca/dataset/strollto
**Publisher:** Economic Development & Culture, City of Toronto
**License:** Open Government Licence – Toronto
**Refresh cycle:** Annual
**Format:** GeoJSON (`FeatureCollection`)
**Coordinate reference system:** CRS84 (WGS84), coordinates ordered `[longitude, latitude]`
**Geometry type:** `MultiPoint` in both resources; every feature contains exactly one coordinate pair, located at `geometry.coordinates[0]`

The dataset consists of two resources describing self-guided walking itineraries for Toronto neighbourhoods: an itinerary-level resource (Starting Points) and a stop-level resource (POI Details).

---

## Resource 1: StrollTO Starting Points

One record per neighbourhood itinerary. 159 records.

| Field | Type | Nullable | Description |
|---|---|---|---|
| `_id` | integer | No | Sequential row identifier |
| `Neighbourhood` | string | No | Neighbourhood name. Foreign key to POI Details `Neighbourhood` (see Data Quality Notes) |
| `Neighbourhood_Num` | string | No | City neighbourhood code. Numeric value stored as text |
| `Ward` | string | No | Ward number(s). Pipe-delimited (`"9\|11"`) when the itinerary spans more than one ward |
| `Ward_Name` | string | No | Ward name(s), comma-delimited, positionally aligned with `Ward` |
| `Title` | string | No | Display name of the itinerary |
| `Main_Streets` | string | No | Free-text list of the itinerary's main streets. May include embedded operational notes (e.g., vehicle access restrictions) |
| `Description` | string | No | Long-form neighbourhood description, multiple paragraphs, `\n\n` as paragraph delimiter |
| `Accessibility` | string | No | Free-text accessibility notes for the itinerary as a whole |
| `BIA` | string | No | Business Improvement Area name |
| `geometry` | MultiPoint | No | Itinerary starting coordinate |

---

## Resource 2: StrollTO POI Details

One record per point of interest. 1,836 records; average 11.5 per neighbourhood, maximum 15 by design.

| Field | Type | Nullable | Description |
|---|---|---|---|
| `_id` | integer | No | Sequential row identifier |
| `Neighbourhood` | string | No | Neighbourhood name. Foreign key to Starting Points `Neighbourhood` (see Data Quality Notes) |
| `Neighbourhood_Num` | string | No | City neighbourhood code, matches Starting Points |
| `Ward` | string | No | Ward number(s), same pipe-delimited convention as Starting Points. 34% of records list more than one ward |
| `Ward_Name` | string | No | Ward name(s), comma-delimited, positionally aligned with `Ward` |
| `Title` | string | No | Point of interest name |
| `Address` | string | 0.3% (5 of 1,836) | Street address or location description |
| `Description` | string | No | Free-text description of the point of interest |
| `Accessibility` | string | 100% empty | Present in schema, unpopulated in all records; accessibility information exists only at the itinerary level |
| `Link_URL` | string | 42% | External reference link, typically a toronto.ca page |
| `Link2_URLText` | string | 99.5% | Display text for a secondary link |
| `Link2_URL` | string | 99.6% | Secondary external link |
| `AdditionalURLText` | string | 100% empty | Present in schema, unpopulated in all records |
| `AdditionalURL` | string | 100% empty | Present in schema, unpopulated in all records |
| `BIA` | string | 100% empty | Present in schema, unpopulated at the POI level; populated only in Starting Points |
| `IMAGE_URL` | string | 56% | Photograph URL |
| `IMAGE_ALT_TEXT` | string | 57% | Alt text for the photograph |
| `IMAGE_CREDIT` | string | 95% | Photographer or source credit |
| `geometry` | MultiPoint | No | Point of interest coordinate |

---

## Data Quality Notes

**Null representation.** Missing values are encoded as the four-character string `"None"`, not JSON `null`. Nullability percentages above count both representations as missing. Parsing logic that checks only for JSON `null` will treat these fields as populated.

**Join key inconsistency.** `Neighbourhood` differs in spelling or punctuation between the two resources for 12 neighbourhoods (e.g., `"West Humber-Clairville"` in Starting Points vs. `"West Humber Clairville"` in POI Details). An exact-string join on `Neighbourhood` drops POIs for these 12 neighbourhoods. `Neighbourhood_Num` does not exhibit this inconsistency and is the more reliable join key.

**Delimiter convention for multi-value fields.** `Ward` uses pipe delimiters (`"9|11"`); `Ward_Name` uses comma delimiters for the same records, with values positionally aligned to `Ward`.

**No category or type classification.** Neither resource includes a field classifying a point of interest by type (park, mural, historic building, etc.).

**Coverage is capped, not exhaustive.** Each neighbourhood is limited to a maximum of 15 points of interest by design; the dataset is a curated selection, not a complete inventory.

---

## Licensing

Open Government Licence – Toronto.