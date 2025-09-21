export function formatAirportData(airports) {
  return airports?.map((airport) => {
    return {
      id: airport?.AirportID,
      name: airport?.Name,
      lat: Number(airport?.Latitude),
      lon: Number(airport?.Longitude),
    };
  });
}
