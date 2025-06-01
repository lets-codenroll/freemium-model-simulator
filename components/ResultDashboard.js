import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function ResultDashboard({ data }) {
  if (!data?.length) return null;

  return (
    <div className="mt-8 space-y-8">
      <h2 className="text-xl font-semibold">Simulation Results</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#1d4ed8" name="Revenue" />
          <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
        </LineChart>
      </ResponsiveContainer>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Users</th>
              <th className="p-2 border">Paid</th>
              <th className="p-2 border">Revenue</th>
              <th className="p-2 border">Expenses</th>
              <th className="p-2 border">Profit</th>
              <th className="p-2 border">LTV</th>
              <th className="p-2 border">ROI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.month}>
                <td className="p-2 border text-center">{row.month}</td>
                <td className="p-2 border text-center">{row.users}</td>
                <td className="p-2 border text-center">{row.paidUsers}</td>
                <td className="p-2 border text-center">₪{row.revenue}</td>
                <td className="p-2 border text-center">₪{row.expenses}</td>
                <td className="p-2 border text-center">₪{row.profit}</td>
                <td className="p-2 border text-center">{row.ltv}</td>
                <td className="p-2 border text-center">{row.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
