export function formatRoutesData(routes, airports) {
  return routes
    .map(route => {
      const sourceAirport = airports.find(
        a => a.IATA === route["Source airport"]
      );
      const destAirport = airports.find(
        a => a.IATA === route["Destination airport"]
      );

      if (!sourceAirport || !destAirport) return null;

      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [
              parseFloat(sourceAirport.Longitude),
              parseFloat(sourceAirport.Latitude),
            ],
            [
              parseFloat(destAirport.Longitude),
              parseFloat(destAirport.Latitude),
            ],
          ],
        },
      };
    })
    .filter(Boolean); 
}
