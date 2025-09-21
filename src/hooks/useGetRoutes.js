import { useLoadData } from "./useLoadData";

export function useGetRoutes(airports) {
  const { data: routes, loading, error } = useLoadData('routes.txt');

  if (loading || error || !airports) {
    return {
      data: [],
      loading,
      error,
    };
  }


  const brazilRoutes = routes.filter(route => {
    const source = airports.find(a => a.AirportID === route["Source airport ID"]);
    const dest = airports.find(a => a.AirportID === route["Destination airport ID"]);
    return source && dest;
  });

  return {
    data: brazilRoutes,
    loading,
    error
  };
}
