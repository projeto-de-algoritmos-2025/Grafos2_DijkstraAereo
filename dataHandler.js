import fs from 'fs';
import Papa from 'papaparse';

//função p ler o aquivo
function parseCSV(path){
    const content = fs.readFileSync(path, 'utf8');
    return Papa.parse(content, {header: true, skipEmptyLines: true}).data;
}

const airports = parseCSV('airports.dat.txt');
const routes = parseCSV('routes.dat.txt');

const brazilAirports = airports.filter(a=> a.Country && a.Country.trim().toLowerCase() === 'brazil');

//acessa os aeroportos por ID
const airportById = new Map();
brazilAirports.forEach(a => {
  airportById.set(a['Airport ID'], a);
});

function haversine(lat1, lon1, lat2, lon2){
  const R = 6371;
  const toRad = deg => (deg*Math.PI) / 180;

  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);

  //a = sin²(dLat/2) + cos(lat1).cos(lat2).sin²(dlon/2)
  //c = 2.atan(raiz quadrada de a, raiz quadrada de 1-a) 
  //d = R.c

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = R*c;

  return distance;
}

const brazilRoutes = routes

.filter(r =>
  airportById.has(r['Source airport ID']) &&
  airportById.has(r['Destination airport ID'])
)
.map(r => {
  const source = airportById.get(r['Source airport ID']);
  const dest = airportById.get(r['Destination airport ID']);
  const distance = haversine(parseFloat(source.Latitude), parseFloat(source.Longitude), parseFloat(dest.Latitude), parseFloat(dest.Longitude));

  return {
      airline: r.Airline,
      from: source.Name,
      to: dest.Name,
      fromIATA: source.IATA,
      toIATA: dest.IATA,
      distanceKm: distance.toFixed(2)
  }
})




