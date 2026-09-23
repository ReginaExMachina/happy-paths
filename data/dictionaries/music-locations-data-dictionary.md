# Music Venues, Spaces, Studios & Stores Data Dictionary

**Source:** open.toronto.ca/dataset/music-venues-spaces-studios-and-stores
**Publisher:** Economic Development & Culture, City of Toronto
**License:** Open Government Licence – Toronto
**Refresh cycle:** Quarterly
**Contact:** music@toronto.ca

Locations of music industry venues, spaces, studios, and stores across Toronto. Inclusion is opt-in by the venue/organization, supplemented by City staff research.

## Resource: Music Locations

**Format:** GeoJSON (`FeatureCollection`)
**Coordinate reference system:** CRS84 (WGS84), coordinates ordered `[longitude, latitude]`
**Geometry type:** `MultiPoint`; every feature contains exactly one coordinate pair, located at `geometry.coordinates[0]`
**Records:** 638

| Field | Type | Nullable | Description |
|---|---|---|---|
| `_id` | integer | No | Sequential row identifier |
| `CATEGORY` | string | No | Venue/space type. See value domain below |
| `NAME` | string | No | Venue or business name. 634 unique values across 638 records (4 duplicates, likely distinct locations of the same named business) |
| `CAPACITY` | string | 88% | Free-text audience/venue capacity. Not a consistent numeric format, see Data Quality Notes |
| `WEBSITE` | string | 3% missing | URL, format not standardized (some include tracking query parameters) |
| `WARD` | string | 0.8% missing (5 of 638) | Two-digit zero-padded ward number (`"01"`–`"25"`), stored as text |
| `ADDRESS` | string | No | Street address |
| `PHONE` | string | 97% missing | Free-text phone number. Not a consistent format, see Data Quality Notes |
| `created_date` | string (date, `YYYY-MM-DD`) | No | Date the record was added to the dataset. 563 of 638 records (88%) share the single date `2020-06-17`, see Data Quality Notes |

## Value Domain: CATEGORY

| Value | Record count |
|---|---|
| Alternative Spaces | 270 |
| Music Venues | 193 |
| Recording Studios | 75 |
| Instrument Stores | 42 |
| Record Stores | 41 |
| Rehearsal Studios | 14 |
| Multiuse Venues | 3 |

## Data Quality Notes

**Missing values are encoded as the literal string `"None"`, not JSON `null`**, in both `CAPACITY` and `PHONE`.

**`CAPACITY` is unstructured free text, not a consistent numeric field.** Observed formats include plain numbers (`"150"`), ranges (`"100-140"`, `"1,500-5,000"`), qualified values (`"up to 350"`, `"300+"`), and multi-number breakdowns (`"30 in 33 out"`, `"150/58/45"`). Any numeric use of this field requires parsing logic that handles all of these cases, or a decision to discard the non-numeric ones.

**`PHONE` has no consistent format** across its 20 populated records: parentheses (`"(416) 537-6066"`), dots (`"416.240.0168"`), no separators (`"6472842964"`), with country code (`"+16477157277"`), and at least one entry with a trailing invisible Unicode character (`"705-712-3671\u202c"`).

**`created_date` mostly reflects the dataset's initial bulk load, not each venue's actual addition date.** 88% of records share the identical date `2020-06-17`, likely when the date this dataset was first published.

**5 records are missing a `WARD` value**: Pearson Airport T1, Long & McQuade (North York), Boom Recording Studio, Metalworks Studios, and UV.

## Licensing

Open Government Licence – Toronto.