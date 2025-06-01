import { useEffect, useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultDashboard from '@/components/ResultDashboard';
import { v4 as uuidv4 } from 'uuid';
import { exportScenarioToPDF } from '@/lib/exportPdf';

export default function Home() {
    const [scenarios, setScenarios] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function handleSubmit(inputData) {
        const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
        });

        const json = await res.json();
        if (json.success) {
        const newScenario = {
            id: uuidv4(),
            name: `Scenario #${scenarios.length + 1}`,
            inputs: inputData,
            results: json.simulation
        };
        setScenarios([...scenarios, newScenario]);
        setSelectedId(newScenario.id);
        }
    }

    function renameScenario(id) {
        const newName = prompt('Enter new name:');
        if (!newName) return;
        setScenarios(scenarios.map(s => s.id === id ? { ...s, name: newName } : s));
    }

    function deleteScenario(id) {
        const confirmed = window.confirm('Delete this scenario?');
        if (!confirmed) return;

        const newList = scenarios.filter(s => s.id !== id);
        setScenarios(newList);
        if (selectedId === id && newList.length > 0) {
            setSelectedId(newList.at(-1).id);
        } else if (newList.length === 0) {
            setSelectedId(null);
        }
    }


    // Load from localStorage on first mount
    useEffect(() => {
        const saved = localStorage.getItem('freemium_scenarios');
        if (saved) {
        const parsed = JSON.parse(saved);
        setScenarios(parsed);
        setSelectedId(parsed.at(-1)?.id ?? null);
        }
    }, []);

    // Save to localStorage on every scenarios update
    useEffect(() => {
        localStorage.setItem('freemium_scenarios', JSON.stringify(scenarios));
    }, [scenarios]);

    const selectedScenario = scenarios.find(s => s.id === selectedId);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Freemium Model Simulator</h1>

        <InputForm onSubmit={handleSubmit} />

        {scenarios.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Saved Scenarios</h2>
            <div className="flex flex-wrap gap-2">
              {scenarios.map((s) => (
                <div key={s.id} className="flex items-center space-x-1">
                <button
                    onClick={() => setSelectedId(s.id)}
                    className={`px-3 py-1 rounded border text-sm ${
                    selectedId === s.id ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                >
                    {s.name}
                </button>
                <button onClick={() => renameScenario(s.id)} className="text-xs text-gray-500 hover:text-gray-800">✏️</button>
                <button onClick={() => deleteScenario(s.id)} className="text-xs text-red-500 hover:text-red-800">🗑️</button>
                </div>
            ))}
            </div>
          </div>
        )}

        {selectedScenario && <ResultDashboard data={selectedScenario.results} cac={selectedScenario.inputs.cac} />}
        {selectedScenario && (
        <div className="mt-4">
            <button
            onClick={() => exportScenarioToPDF(selectedScenario)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
            Export as PDF
            </button>
        </div>
        )}
      </div>
    </main>
  );
}
