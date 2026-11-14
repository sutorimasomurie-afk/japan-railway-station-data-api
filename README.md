# Japan Railway Station Data API: examples

Code samples for the **[Japan Railway Station Data API](https://rapidapi.com/sutorimasutorima/api/japan-railway-station-data)**: **every railway, subway and tram station in Japan** (9,000+) with English names, kana readings, coordinates, prefecture and municipality, the lines and operators serving each station, and **daily passenger counts for fiscal 2011–2024**.

| You want to... | Endpoint |
|---|---|
| Find the nearest stations to a latitude/longitude (with a walking-time estimate) | `GET /v1/nearest?lat=&lon=` |
| Search by name in kanji, hiragana, katakana or romaji (`shinjuku`, `しんじゅく`, `新宿`, `shin-osaka`) | `GET /v1/search?q=` |
| Station detail: lines, operators (English names for major companies), passengers per day by year | `GET /v1/stations/{id}` |
| Busiest stations, or the biggest change since 2019, nationwide or by prefecture/operator | `GET /v1/rankings?metric=` |
| Filter stations by prefecture, municipality, operator, line or type (subway, shinkansen, tram...) | `GET /v1/stations` |
| Lines and operators | `GET /v1/lines`, `GET /v1/operators` |
| Stations in a municipality (local government code) | `GET /v1/municipalities/{code}/stations` |

Example: `新大阪` → `Shin-Osaka` / `しんおおさか`, lines `JR West: 山陽新幹線`, `JR Central: 東海道新幹線`, `Osaka Metro: 御堂筋線`.

## Quick start

1. Subscribe on RapidAPI (the BASIC plan is free): https://rapidapi.com/sutorimasutorima/api/japan-railway-station-data
2. `export RAPIDAPI_KEY=...`
3. `node examples/example.mjs` or `python3 examples/example.py`

```bash
curl "https://japan-railway-station-data.p.rapidapi.com/v1/nearest?lat=35.6586&lon=139.7454" \
  -H "x-rapidapi-key: $RAPIDAPI_KEY" \
  -H "x-rapidapi-host: japan-railway-station-data.p.rapidapi.com"
```

## Data

Built from MLIT National Land Numerical Information (railway data N02 and passengers by station S12, CC BY 4.0) and Wikidata (CC0), with municipalities from GSI where Wikidata has none. Full sources, licences and coverage: `GET /v1/sources`. Not an official service of any railway company or government agency.

Related: [Japan Municipality Data API](https://github.com/sutorimasomurie-afk/japan-municipality-data-api) uses the same municipality codes.

The examples in this repository are MIT licensed.
