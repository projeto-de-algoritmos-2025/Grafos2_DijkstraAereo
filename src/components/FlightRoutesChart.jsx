import { useMemo } from "react";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import brazilTopoJSON from "@highcharts/map-collection/countries/br/br-all.topo.json";
import { formatAirportData } from "../utils/formatAirportData";
import { formatRoutesData } from "../utils/formatRoutesData";
import { useShortestPath } from "../hooks/useShortestPath";

const FlightRoutesChart = ({ airports, routes, selectedOrigin, selectedDestination }) => {
  const brazilGeoJSON = Highcharts.geojson(brazilTopoJSON, "map");

  const formattedAirportData = useMemo(() => formatAirportData(airports), [airports]);
  const formattedRoutesData = useMemo(() => formatRoutesData(routes, airports), [routes, airports]);

  const displayedAirports = useMemo(() => {
    if (!selectedOrigin && !selectedDestination) return formattedAirportData;

    return formattedAirportData.filter(
      (airport) =>
        airport.id === selectedOrigin || airport.id === selectedDestination
    );
  }, [formattedAirportData, selectedOrigin, selectedDestination]);

  const displayedRoutes = useMemo(() => {
    if (!selectedOrigin && !selectedDestination) return formattedRoutesData;

    const selectedSet = new Set([selectedOrigin, selectedDestination].filter(Boolean));

    return formattedRoutesData.filter(
      (route) =>
        selectedSet.has(route.sourceId) || selectedSet.has(route.destinationId)
    );
  }, [formattedRoutesData, selectedOrigin, selectedDestination]);


  const shortestPath = useShortestPath(formattedAirportData, formattedRoutesData, selectedOrigin, selectedDestination);

  const highlightedRoutes = [];
  if (shortestPath.length > 1) {
    for (let i = 0; i < shortestPath.length - 1; i++) {
      const source = shortestPath[i];
      const destination = shortestPath[i + 1];
      const route = formattedRoutesData.find(
        r => r.sourceId === source && r.destinationId === destination
      );
      if (route) highlightedRoutes.push(route);
    }
  }

  const options = {
    chart: {
      map: brazilGeoJSON,
      minZoom: 0.5,
      height: '65%',
      animation: false,
    },
    plotOptions: {
      series: { animation: false },
    },
    title: { text: "Rotas de avião dentre cidades brasileiras" },
    mapNavigation: { enabled: true, enableMouseWheelZoom: true },
    series: [
      {
        name: "Brazil Map",
        mapData: brazilGeoJSON,
        borderColor: "#606060",
        nullColor: "#f0f0f0",
        showInLegend: false,
      },
      {
        type: "mapline",
        name: "Rota do vôo",
        color: "#008000",
        lineWidth: 2,
        data: displayedRoutes,
        enableMouseTracking: true,
        tooltip: {
          pointFormat: "De <b>{point.source}</b> para <b>{point.destination}</b><br>Distância: <b>{point.distanceKm} km</b>",
        },
      },
      {
        type: "mapline",
        name: "Menor Caminho",
        color: "#1a6dccff",
        lineWidth: 3,
        data: highlightedRoutes,
        enableMouseTracking: true,
        tooltip: {
          pointFormat: "De <b>{point.source}</b> para <b>{point.destination}</b><br>Distância: <b>{point.distanceKm} km</b>",
        },
      },
      {
        type: "mappoint",
        name: "Aeroporto",
        color: "#0000FF",
        tooltip: {
          pointFormat: "<b>{point.name}</b><br/>",
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontWeight: "bold",
            color: "#000000",
            textOutline: "1px white",
          },
        },
        data: displayedAirports,
      },
    ],
  };

  return (
    <div className="w-full h-[500px] sm:h-[600px] md:h-[700px]">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
        containerProps={{ style: { width: "100%", height: "100%" } }}
      />
    </div>
  );
};

export default FlightRoutesChart;
