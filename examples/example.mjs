// Node.js 18+ (built-in fetch). Usage: RAPIDAPI_KEY=... node examples/example.mjs
const HOST = 'japan-railway-station-data.p.rapidapi.com';
const KEY = process.env.RAPIDAPI_KEY;
if (!KEY) throw new Error('Set RAPIDAPI_KEY first');

async function get(path) {
  const r = await fetch(`https://${HOST}${path}`, { headers: { 'x-rapidapi-key': KEY, 'x-rapidapi-host': HOST } });
  return r.json();
}

// 1. Nearest stations to Tokyo Tower, with walking-time estimate
const near = await get('/v1/nearest?lat=35.6586&lon=139.7454&limit=3');
for (const s of near.results) console.log(s.romaji, s.name, `${s.distanceKm} km`, `~${s.walkingMinutes} min walk`);

// 2. Search in English, kana or kanji
const { results: [shinOsaka] } = await get('/v1/search?q=shin-osaka');
console.log(shinOsaka.name, shinOsaka.kana, shinOsaka.lines.map((l) => `${l.operatorEn ?? l.operator}: ${l.line}`));

// 3. Busiest stations in Osaka, and passenger history for one of them
const top = await get('/v1/rankings?prefecture=Osaka&limit=5');
for (const r of top.results) console.log(r.rank, r.romaji, r.value.toLocaleString(), 'passengers/day');
const detail = await get(`/v1/stations/${top.results[0].id}`);
console.log(detail.ridership.history, 'vs 2019:', detail.metrics.changeVs2019Pct, '%');

// 4. All Tokyo Metro lines
const lines = await get('/v1/lines?operator=Tokyo%20Metro');
console.log(lines.results.map((l) => `${l.line} (${l.stations} stations)`).join(', '));
