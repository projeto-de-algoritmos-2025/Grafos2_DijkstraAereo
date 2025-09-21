import { useMemo } from "react";
import { dijkstra } from "../utils/dijkstra";

export function useShortestPath(airports, routes, originId, destinationId) {
  return useMemo(() => {
    if (!originId || !destinationId || !airports || !routes) return [];
    return dijkstra(airports, routes, originId, destinationId);
  }, [airports, routes, originId, destinationId]);
}
