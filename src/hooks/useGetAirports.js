import { useLoadData } from "./useLoadData";

export const useGetAirports = () => {
  const { data, loading, error } = useLoadData("airports.txt");

  if (loading || error) {
    return {
      data: null,
      loading,
      error,
    };
  }

  const brazilAirports = data.filter(
    (a) => a.Country && a.Country.trim().toLowerCase() === "brazil"
  );

  const teste = brazilAirports.map((item) => {
    return {
      name: item.Name,
      lat: Number(item.Latitude),
      lon: Number(item.Longitude),
    };
  });

  console.log('teste: ', teste)

  return { data: teste, loading, error };
};
