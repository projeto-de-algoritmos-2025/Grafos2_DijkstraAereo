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

//acessa os aeroportos por IATA ou ID
const airportById = new Map();
brazilAirports.forEach(a => {
  airportById.set(a['Airport ID'], a);
});

const brazilRoutes = routes.filter(r =>
  airportById.has(r['Source airport ID']) &&
  airportById.has(r['Destination airport ID'])
);

// console.log("Total de aeroportos no Brasil:", brazilAirports.length);
// console.log("Total de rotas no Brasil:", brazilRoutes.length);


// console.log("Exemplo de rotas no Brasil:");
// brazilRoutes.slice(0, 5).forEach(r => {
//   const src = airportById.get(r['Source airport ID']);
//   const dst = airportById.get(r['Destination airport ID']);
//   console.log(`${src.Name} (${src.IATA}) -> ${dst.Name} (${dst.IATA})`);
// });
