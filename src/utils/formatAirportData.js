export function formatAirportData (data) {
   return data?.map((item) => {
    return {
      name: item.Name,
      lat: Number(item.Latitude),
      lon: Number(item.Longitude),
    };
  });
}