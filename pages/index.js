import InputForm from '@/components/InputForm';

export default function Home() {
  function handleSubmit(data) {
    console.log('Submitted data:', data);
    // נשלב קריאה ל־API בצעד הבא
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
