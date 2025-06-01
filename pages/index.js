import InputForm from '@/components/InputForm';

export default function Home() {
    async function handleSubmit(data) {
    const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const json = await res.json();
    console.log('Simulation result:', json.simulation);
    }


    return (
        <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Freemium Model Simulator</h1>
            <InputForm onSubmit={handleSubmit} />
        </div>
        </main>
    );
}
