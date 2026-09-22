# Pedestrian Network Data (pednet) Data Dictionary

**Source:** open.toronto.ca/dataset/pedestrian-network
**Publisher:** Information & Technology, City of Toronto (DAV team)
**License:** Open Government Licence – Toronto
**Refresh cycle:** As available
**Scope of this document:** The GeoJSON resource ("Pedestrian Network Data") only. Other published formats (CSV, GeoPackage, Shapefile, MTM10 projection) and the separate "Pedestrian Network Readme" (XLSX) are out of scope; the Readme is the authoritative source for field definitions not independently verifiable from the data itself, noted below as unconfirmed.

## File Structure

| Property | Value |
|---|---|
| Format | GeoJSON `FeatureCollection` |
| Feature count | 87,105 |
| Coordinate reference system | CRS84 (WGS84), coordinates ordered `[longitude, latitude]` |
| Geometry type | `MultiLineString`; every feature contains exactly one line |
| Vertices per line | 94% of features (81,740) are simple 2-point segments; the remainder contain 3 to 11 points |

**Routing note:** For network/graph construction, each consecutive coordinate pair within a line constitutes one edge. Multi-point lines must be decomposed into consecutive pairs; treating a multi-point line as a single edge produces an inaccurate graph.

## Fields

| Field | Type | Nullable | Description |
|---|---|---|---|
| `_id` | integer | No | Sequential row identifier |
| `OBJECTID` | integer | No | Source ArcGIS object identifier; identical numbering pattern to `_id` in this export |
| `ROAD_TYPE` | string | ~1% blank/placeholder | Road or path classification. See value domain below |
| `SIDEWALK_CODE` | float | 1.6% | Numeric sidewalk category code. Does not map one-to-one with `SIDEWALK_DESCRIPTION`; see Data Quality Notes |
| `SIDEWALK_DESCRIPTION` | string | 2% | Sidewalk presence description. See value domain below |
| `CROSSWALK` | integer | 89% | Value `1` indicates a marked crosswalk on the segment. Absence is represented as null, not `0` |
| `CROSSWALK_TYPE` | string | 89% (blank `" "`) | Crosswalk control type, populated when `CROSSWALK` = 1. See value domain below |
| `PX` | string | 91% (blank `" "`) | Pedestrian-crossing facility identifier, populated when a controlled crossing is present. Co-occurs with `PX_TYPE` |
| `PX_TYPE` | string | 91% (blank `" "`) | Control type for the crossing identified in `PX`. Same value domain as `CROSSWALK_TYPE` |
| `LENGTH` | float | No | Segment length in meters (inferred from the source walk-time methodology, which uses 1.0 m/s) |

## Value Domain: ROAD_TYPE

| Value | Record count |
|---|---|
| Local | 33,093 |
| Collector | 11,994 |
| Walkway | 10,043 |
| Major Arterial | 8,430 |
| Trail | 8,212 |
| Minor Arterial | 5,863 |
| Laneway | 4,290 |
| Other | 2,788 |
| Pathway | 832 |
| (blank) | 790 |
| Pending | 709 |
| Access Road | 61 |

`Pending` and blank values are unclassified segments, not distinct road categories.

## Value Domain: SIDEWALK_DESCRIPTION

| Value | Record count |
|---|---|
| Sidewalk on both sides | 41,035 |
| City walkway | 9,951 |
| No sidewalk on either side | 8,497 |
| Not applicable | 8,378 |
| Laneway without any sidewalks | 4,192 |
| Sidewalk on north side only | 2,966 |
| Sidewalk on south side only | 2,908 |
| Sidewalk on east side only | 1,880 |
| (blank) | 1,866 |
| Sidewalk on west side only | 1,807 |
| Partial sidewalk on at least one side | 1,535 |
| N/A | 830 |
| Recreational Trail | 248 |
| Other laneway/roadway-under-development variants | ~100 combined |

## Value Domain: CROSSWALK_TYPE / PX_TYPE

Both fields share the same code vocabulary.

| Code | Count in `CROSSWALK_TYPE` | Count in `PX_TYPE` | Meaning |
|---|---|---|---|
| `ts` | 7,151 | 7,151 | Traffic signal (unconfirmed; see note) |
| `ns` | 1,683 | 1 | Not confirmed |
| `pc` | 474 | 474 | Pedestrian crossover (unconfirmed; see note) |

**Note:** These definitions are inferred from standard Toronto transportation terminology and are not independently confirmed against the dataset's Readme file. Verify against the Readme before using these labels in a user-facing context.

## Data Quality Notes

**`SIDEWALK_CODE` is not a clean categorical key.** The same numeric code is associated with multiple, inconsistent `SIDEWALK_DESCRIPTION` values (e.g., code `7.0` appears with descriptions ranging from "City walkway" to "No sidewalk on either side" to "Not applicable"). `SIDEWALK_DESCRIPTION` should be treated as the primary field; `SIDEWALK_CODE` as a coarser, overlapping grouping.

**Topological over geographic accuracy.** Per the publisher's documentation, the network is optimized for routing connectivity rather than precise real-world line geometry.

**Classification completeness is limited.** The publisher's documentation states known limitations in completeness and classification, consistent with the blank and placeholder values observed in `ROAD_TYPE` and `SIDEWALK_DESCRIPTION`.

**Two network weighting variants exist upstream.** The source methodology describes two versions of the network: one using raw linear distances, and one with crosswalk lengths extended by 20% to model additional crossing impedance. This GeoJSON resource does not indicate which variant it represents; the Readme or other resource formats should be consulted if this distinction affects routing weight calculations.

## Licensing

Open Government Licence – Toronto. Required attribution text and combination with other sources are documented in `docs/data-attribution-plan.md`.