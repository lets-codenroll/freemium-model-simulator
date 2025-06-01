import { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultDashboard from '@/components/ResultDashboard';

export default function Home() {
  const [result, setResult] = useState(null);

  async function handleSubmit(data) {
    const res = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (json.success) {
      setResult(json.simulation);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Freemium Model Simulator</h1>
        <InputForm onSubmit={handleSubmit} />
        <ResultDashboard data={result} />
      </div>
    </main>
  );
}
