"""Python 3.8+, standard library only. Usage: RAPIDAPI_KEY=... python3 examples/example.py"""
import json
import os
import urllib.parse
import urllib.request

HOST = "japan-railway-station-data.p.rapidapi.com"
KEY = os.environ["RAPIDAPI_KEY"]


def get(path):
    req = urllib.request.Request(f"https://{HOST}{path}", headers={"x-rapidapi-key": KEY, "x-rapidapi-host": HOST})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


# Stations within 1 km of Kyoto Station, subway only
for s in get("/v1/nearest?lat=34.9858&lon=135.7588&radiusKm=1&railwayType=subway&limit=5")["results"]:
    print(s["romaji"], s["name"], s["distanceKm"], "km")

# Which big stations have recovered most since 2019?
for r in get("/v1/rankings?metric=changeVs2019Pct&minRidership=100000&limit=10")["results"]:
    print(r["rank"], r["romaji"], f'{r["value"]:+.1f}%')

# Stations in Shibuya City (municipality code 13113), busiest first
for s in get("/v1/municipalities/13113/stations")["results"][:5]:
    print(s["romaji"], s["ridershipPerDay"])

# Search in Japanese
q = urllib.parse.quote("しんじゅく")
print(get(f"/v1/search?q={q}")["results"][0]["name"])
