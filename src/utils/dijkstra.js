export function dijkstra(airports, routes, sourceId, targetId) {
  const airportMap = Object.fromEntries(airports.map(a => [a.AirportID, a]));
  const graph = {};
  routes.forEach(route => {
    if (!graph[route.SourceAirportID]){
        graph[route.SourceAirportID] = [];
    }
    graph[route.SourceAirportID].push({
    id: route.DestinationAirportID,
    distance: route.Distance 
    });
  });

  const distances = {};
  const previous = {};
  const queue = new Set(Object.keys(airportMap));
  Object.keys(airportMap).forEach(id => distances[id] = Infinity);
  distances[sourceId] = 0;

  while (queue.size) {
    let minNode = null;
    queue.forEach(id => {
      if (minNode === null || distances[id] < distances[minNode]) minNode = id;
    });
    if (minNode === targetId || distances[minNode] === Infinity) break;

    queue.delete(minNode);

    (graph[minNode] || []).forEach(neighbor => {
      const alt = distances[minNode] + neighbor.distance;
      if (alt < distances[neighbor.id]) {
        distances[neighbor.id] = alt;
        previous[neighbor.id] = minNode;
      }
    });
  }

  const path = [];
  let curr = targetId;
  while (previous[curr]) {
    path.unshift(curr);
    curr = previous[curr];
  }
  if (curr === sourceId) path.unshift(sourceId);

  if(path.length){
    return path
  } else {
    return [];
  }
}