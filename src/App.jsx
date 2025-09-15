import FlightRoutesChart from './components/MapChart';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <FlightRoutesChart />
      </div>
    </div>
  );
}

export default App;
