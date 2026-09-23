# Festivals & Events Data Dictionary

**Source:** open.toronto.ca/dataset/festivals-and-events
**Publisher:** Economic Development & Culture, City of Toronto
**License:** Open Government Licence – Toronto
**Refresh cycle:** Real-time (nominal; see the second resource below)
**Contact:** spevcal@toronto.ca

This dataset lists festivals, special events, and exhibits submitted by event organizers, reviewed by City Tourism Services staff, and approved for the City's public events calendar. **Note:** Field accuracy is the organizer's responsibility, not the City's.

Structured below in the same order and grouping the resources appear in on the dataset page: four resources, four sections.

---

## Resource: Temporary Festival and Events Feed (while the other is broken)

**Format:** JSON
**File referenced in this document:** `events.json`

This is the dataset's current working JSON resource. Top-level structure: `{"value": [ {...}, {...}, ... ]}`, 5,000 records in the file reviewed. Every field below is present in all 5,000 records, though many are frequently null.

| Field | Type | Non-empty | Description |
|---|---|---|---|
| `id` | string (UUID) | 100% | Unique identifier for this row (one per calendar occurrence, see Data Quality Notes) |
| `submission_id` | string (UUID) | 100% | Identifier for the underlying event submission. Many rows share one `submission_id` |
| `__CreatedOn` / `__ModifiedOn` | string (ISO 8601 datetime) | 100% | Record audit timestamps |
| `__Owner` | string | 100% | Internal system owner tag, observed constant value `c3api_config` |
| `__Status` | string | 0% | Present in schema, empty in all sampled records |
| `event_name` / `short_name` | string | 100% | Event title. Observed identical in all sampled records |
| `event_description` / `short_description` | string | 100% | Observed identical in all sampled records |
| `event_status` | string | 100% | Observed value in sample: `Approved` |
| `event_startdate` / `event_enddate` | string (ISO 8601 datetime) | 100% | Overall span of the event across all occurrences |
| `event_expirydate` | string (ISO 8601 datetime) | 100% | Observed identical to `event_enddate` in sample |
| `calendar_date` | string (ISO 8601 datetime) | 100% | The specific date/time this row's calendar occurrence represents |
| `calendar_date_group` | string (date, `YYYY-MM-DD`) | 100% | Date portion of `calendar_date` |
| `calendar_id` | string (UUID) | 100% | Identifier for this specific calendar occurrence |
| `calendar_name` | string | 72% | Observed values include category-like labels (e.g., `"Tourism"`) |
| `calendar_time_of_day` | string | 100% | Observed value in sample: `Day Event` |
| `event_category` | array of strings | 100% | One or more categories, plain strings. Top values: Arts/Exhibits, Museum, Live Performances, Family/Children, History |
| `other_event_category` | string | 4% | Free-text category when `event_category` includes an "Other" value |
| `event_sub_category` | array of strings | 3% | Rarely populated |
| `other_event_sub_category` | string | 3% | Free-text sub-category |
| `event_theme` | array of strings | 23% | E.g., `"Winter Holidays"` |
| `event_dates` | array of objects | 100% | Each item: `{date: <epoch ms>, locations: [<address string>, ...], sdate: <human-readable string>}`. One item per occurrence of a recurring event |
| `event_locations` | array of objects | 100% | See sub-table below. 4,924 records have exactly one location; up to 15 observed on a single record |
| `accessible_event` | string | 100% | Observed values: `Yes` / presumably `No` |
| `event_features` | array of strings | 80% | Plain strings. Observed values: Public Washrooms, On-site Food and Beverages, Paid Parking, Bike Racks, Free Parking, Gender Neutral Washrooms, Ages 19+ |
| `free_event` | string | 100% | Observed values: `Yes` / presumably `No` |
| `event_price` | string (numeric text) | 8% | Flat price when applicable |
| `event_price_low` / `event_price_high` | string (numeric text) | 23% each | Price range |
| `event_price_adult` / `event_price_child` / `event_price_youth` / `event_price_student` / `event_price_senior` | string (numeric text) | 6–8% each | Per-category pricing |
| `event_price_pwyc` | string (numeric text) | 1% | "Pay what you can" suggested amount |
| `cost_notes` | string | 19% | Free-text pricing detail |
| `reservations_required` | string | 100% | Observed values: `No` / presumably `Yes` |
| `event_website` | string (URL) | 97% | |
| `event_email` | string | 67% | |
| `event_telephone` / `event_telephone_ext` | string | 55% / 1% | |
| `ticket_website` / `ticket_email` / `ticket_telephone` / `ticket_telephone_ext` | string | 50% / 28% / 23% / 0.2% | Separate contact channel specifically for ticketing |
| `facebook_url` / `instagram_url` / `twitter_url` | string | 42% / 64% / 15% | Handle or partial URL, format not standardized (see Data Quality Notes) |
| `event_image` | array of objects | 88% | Each item: `{bin_id, fields: {alt, credit}, file_name, name, size, status, type, uploadDate}` |
| `partnerships` | array of objects | 38% | Each item: `{text: <partner name>, value: <relationship type, e.g. "event_presented_by">}` |
| `featured_event` | string | 100% | Observed values: `Yes` / presumably `No` |

### Sub-structure: `event_locations[]`

| Field | Type | Description |
|---|---|---|
| `location_address` | string | Full address text |
| `geo_lat` / `geo_long` | string | Coordinates. **0% populated across the entire 5,221 location entries sampled** (see Data Quality Notes) |
| `date_notes` | string | Free-text scheduling notes specific to this location |
| `location_dates` | string | A JSON document encoded as a string (double-encoded), containing its own nested schedule structure (`startdate`, `starttime`, `event_frequency`, `repeat_weekdays`, etc.). Requires a second parse step to use |

---

## Resource: Festivals and events json feed

**Format:** JSON

This is the dataset's standard live JSON resource, the one the resource above is standing in for. A request against it currently returns an HTTP 403 Access Denied response rather than data. This is consistent with the dataset page's own status note: unavailable since May 23, 2026, tracked as ticket DIA-858, status "Waiting on Owner Division" as of August 4, 2026.

---

## Resource: festivals-and-events-readme

**Format:** XLS, 4 sheets

| Sheet | Contents |
|---|---|
| Mapping | Field-by-field documentation of a `calEvent` submission object: field name, type, description, which submission-form tab it appears on, the on-screen label, validation rules, and notes. Matches the JSON schema implied by "Festivals and events json feed," not the Temporary Feed |
| Examples | One fully worked example `calEvent` JSON object illustrating the Mapping sheet's schema in context |
| Quick List | A condensed field-name/description pairing of the same schema as Mapping, plus usage notes for querying the live feed with `?start=` and `?limit=` parameters |
| Historical XML Feed Metadata | Field-by-field documentation of the historical XML feed (see next resource). This sheet's field names and descriptions match that file's actual structure |

This resource is documentation, not event data itself. No section describes the Temporary Feed.

---

## Resource: festivals-and-events-historical-xml-feed-jan-2014-dec-2016

**Format:** XML (Lotus Notes `viewentries` export)
**Records:** 1,000 `<viewentry>` elements present in the file. **The file's own root element carries a `toplevelentries="38481"` attribute**, indicating this file is a partial export, very likely a single page of a paginated view, not the complete claimed archive (see Data Quality Notes).

Each event is a `<viewentry>` containing `<entrydata name="...">` elements.

| Field | Description |
|---|---|
| `EventName` | Event title |
| `Area` | City area (e.g., `Downtown`) |
| `CategoryList` | One or more category text values |
| `PresentedByOrgName` | Presenting organization |
| `Image` | Image URL |
| `DateBeginShow` / `DateEndShow` | Event start/end dates as display text. Date format is inconsistent (e.g., `"Sep 4, 2014"` vs. `"September 27, 2014"`) |
| `TimeBegin` / `TimeEnd` | Display time text |
| `Admission` | Free-text price range (e.g., `"$80 - $89"`) |
| `LongDesc` | One or more paragraphs, each a separate `<text>` element |
| `OrgContactPhone` / `OrgContactExt` / `OrgContactEMail` | Organization contact details |
| `Location` | Venue name |
| `Intersection` | Nearest cross-streets |
| `MapAddress` | An embedded HTML `<a>` tag linking to a City map, with coordinates present in the URL's query string as well as duplicated in `txtLat`/`txtLong` |
| `TTC` | Nearest transit access, free text |
| `EventURL` | Event's primary URL |
| `ImageAltText` | Alt text for `Image` |
| `AccessibleFully` / `AccessiblePartially` | Accessibility status/notes |
| `ParkingFree` / `ParkingPaid` / `PublicWashrooms` / `FoodBeverage` / `Shopping` / `Exhibit` / `Performance` / `KidFriendly` / `Green` / `NewThisYear` / `Reservations` / `OfficialGreenSite` / `BikeRacks` / `RoadClose` / `OrganicFood` | Boolean-style feature flags. Represented as present with descriptive text when true, and an empty element when false/not applicable, not a `true`/`false` value |
| `Address` | Street address |
| `txtGeoId` | Internal City address-point identifier |
| `txtLat` / `txtLong` | Coordinates. **61.7% populated** in the 1,000-record sample (contrast with the Temporary Feed's 0%, see Data Quality Notes) |
| `NumberLocations` | Populated only when an event has more than one location; null/absent implies exactly one |
| `LocationType_N`, `Location_N`, `TTC_N`, `Address_N`, `txtGeoId_N`, `txtLong_N`, `txtLat_N` | Repeated field sets for additional locations (`_1`, `_2`, ...), same meaning as their unsuffixed counterparts |

---

## Data Quality Notes

**Coordinate availability is inverted between the two data resources.** The historical XML feed has real coordinates (`txtLat`/`txtLong`) in 61.7% of sampled records. The Temporary Feed's equivalent fields (`geo_lat`/`geo_long`) are **empty in 100%** of the 5,221 location entries sampled.

**The readme documents the standard feed's schema, not the Temporary Feed's.** Its "Mapping" sheet describes fields like `eventName`, `category` as an array of `{name: "..."}` objects, and `features` as an object of booleans. The Temporary Feed uses different field names entirely (`event_name`, snake_case throughout) and different shapes for the same concepts (`event_category` and `event_features` are both arrays of plain strings).

**Recordw in the Temporary Feed are per-occurrence, not per-event.** 5,000 rows resolve to only 856 distinct `submission_id` values. A recurring event (e.g., a weekly exhibition) produces one row per calendar date it occurs on.

**`location_dates` is a JSON string nested inside a JSON string.** Parsing `event_locations[].location_dates` in the Temporary Feed requires a second `JSON.parse()` (or equivalent) after parsing the outer document.

**The historical XML file is a partial export.** Its own header claims 38,481 total entries; only 1,000 `<viewentry>` elements are present in the file provided.

**Social media fields are unstructured text, not consistent URLs.** `facebook_url`, `instagram_url`, and `twitter_url` mix full URLs (`www.facebook.com/...`) with bare handles (`drom.taberna`, `necessaryangel`).

**Boolean-style feature flags in the historical feed are not true booleans.** Fields like `ParkingFree`, `KidFriendly`, etc. are populated with descriptive text when applicable and left as empty elements otherwise, not `true`/`false` values.

## Licensing

Open Government Licence – Toronto. Note that per the dataset's own description, the City is not responsible for the accuracy of organizer-submitted content.