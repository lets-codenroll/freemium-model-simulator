import { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultDashboard from '@/components/ResultDashboard';
import { v4 as uuidv4 } from 'uuid';

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
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`px-3 py-1 rounded border ${selectedId === s.id ? 'bg-blue-600 text-white' : 'bg-white'}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedScenario && <ResultDashboard data={selectedScenario.results} />}
      </div>
    </main>
  );
}
