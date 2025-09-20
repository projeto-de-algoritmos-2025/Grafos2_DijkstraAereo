import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import brazilTopoJSON from "@highcharts/map-collection/countries/br/br-all.topo.json";
import { useGetAirports } from "../hooks/useGetAirports"

const FlightRoutesChart = () => {
  const brazilGeoJSON = Highcharts.geojson(brazilTopoJSON, "map");


  const {data: airports } = useGetAirports()

  const options = {
    chart: {
      map: brazilGeoJSON,
      minZoom: 0.5,
      height: '65%',
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
        data: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [-47.9292, -15.7942], // Distrito Federal
                [-46.6333, -23.5505], // São Paulo
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [-46.6333, -23.5505], // São Paulo
                [-42.021, -22.129], // Rio de Janeiro
              ],
            },
          },
        ],
        enableMouseTracking: false,
      },
      {
        type: "mappoint",
        name: "Cidades",
        color: "#0000FF",
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            fontWeight: 'bold',
            color: '#000000',
            textOutline: '1px white'
          },
        },
        data: airports,
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
