import { useState } from "react";
import FlightRoutesChart from './components/FlightRoutesChart';
import Inputs from './components/Inputs';
import { useGetAirports } from './hooks/useGetAirports';
import { useGetRoutes } from './hooks/useGetRoutes';

function App() {

  const { data: airports } = useGetAirports()
  const { data: routes } = useGetRoutes(airports)

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <Inputs
          airports={airports}
          originValue={origin}
          destinationValue={destination}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
        />
        <FlightRoutesChart airports={airports} routes={routes} selectedOrigin={origin} selectedDestination={destination} />
      </div>
    </div>
  );
}

export default App;
