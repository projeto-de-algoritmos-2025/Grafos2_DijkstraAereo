import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import worldTopoJSON from "@highcharts/map-collection/custom/world.topo.json";
import brazilTopoJSON from "@highcharts/map-collection/countries/br/br-all.topo.json";

const FlightRoutesChart = () => {
  const worldGeoJSON = Highcharts.geojson(brazilTopoJSON, "map");

  const options = {
  chart: {
    map: worldGeoJSON,
    minZoom: 0.5,
  },
  title: { text: "Simple Flight Routes" },
  mapNavigation: { enabled: true, enableMouseWheelZoom: true },
  series: [
    {
      name: "World Map",
      mapData: worldGeoJSON,
      borderColor: "#606060",
      nullColor: "#f0f0f0",
      showInLegend: false,
    },
    {
      type: "mapline",
      name: "Flight Route",
      color: "#FF0000",
      lineWidth: 2,
      data: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [-46.6333, -23.5505],
              [2.3522, 48.8566],
            ],
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [-74.006, 40.7128],
              [139.6917, 35.6895],
            ],
          },
        },
      ],
      enableMouseTracking: false,
    },
    {
      type: "mappoint",
      name: "Cities",
      color: "#0000FF",
      data: [
        { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
        { name: "Paris", lat: 48.8566, lon: 2.3522 },
        { name: "New York", lat: 40.7128, lon: -74.006 },
        { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
      ],
    },
  ],
};


  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="mapChart"
      options={options}
    />
  );
};

export default FlightRoutesChart;
