import { haversineDistance } from "./haversineDistance";

export function formatRoutesData(routes, airports) {
  return routes
    .map((route) => {
      const sourceAirport = airports.find(
        (a) => a.IATA === route["Source airport"]
      );
      const destAirport = airports.find(
        (a) => a.IATA === route["Destination airport"]
      );

      if (!sourceAirport || !destAirport) return null;

      const lat1 = parseFloat(sourceAirport.Latitude);
      const lon1 = parseFloat(sourceAirport.Longitude);
      const lat2 = parseFloat(destAirport.Latitude);
      const lon2 = parseFloat(destAirport.Longitude);

      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [lon1, lat1],
            [lon2, lat2],
          ],
        },
        source: sourceAirport.Name,
        destination: destAirport.Name,
        sourceId: sourceAirport.AirportID,
        destinationId: destAirport.AirportID,
        distanceKm: haversineDistance(lat1, lon1, lat2, lon2),
      };
    })
    .filter(Boolean);
}
