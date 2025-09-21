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

  return { data: brazilAirports, loading, error };
};
