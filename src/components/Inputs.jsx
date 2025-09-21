import { useMemo } from "react";

const Inputs = ({ airports, onOriginChange, onDestinationChange, originValue, destinationValue }) => {
    const options = useMemo(() => {
        return airports?.map((airport) => ({
            id: airport?.AirportID,
            name: airport?.Name,
        }));
    }, [airports]);

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label
                    htmlFor="origin"
                    className="text-sm font-medium text-gray-700 mb-1"
                >
                    Aeroporto de Origem
                </label>
                <select
                    id="origin"
                    value={originValue}
                    onChange={(e) => onOriginChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione...</option>
                    {options?.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="destination"
                    className="text-sm font-medium text-gray-700 mb-1"
                >
                    Aeroporto de Destino
                </label>
                <select
                    id="destination"
                    value={destinationValue}
                    onChange={(e) => onDestinationChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione...</option>
                    {options?.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Inputs;
