import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function ResultDashboard({ data }) {
    if (!data?.length) return null;

    function getSummary(data) {
        const last = data[data.length - 1];
        const avgProfit = Math.round(data.reduce((sum, d) => sum + d.profit, 0) / data.length);
        const breakEvenMonth = data.find(d => d.profit >= 0)?.month || 'Never';
        const avgROI = (data.reduce((sum, d) => sum + d.roi, 0) / data.length).toFixed(2);

        const totalFixed = data.reduce((sum, d) => sum + (d.fixedCosts || 0), 0);
        const totalExpenses = data.reduce((sum, d) => sum + (d.expenses || 0), 0);
        const fixedShare = totalExpenses > 0 ? ((totalFixed / totalExpenses) * 100).toFixed(1) : 0;

        return {
            avgProfit,
            finalPaidUsers: last.paidUsers,
            finalRevenue: last.revenue,
            breakEvenMonth,
            avgROI,
            fixedShare
        };
        }

    
    const summary = getSummary(data);


  return (
    <div className="mt-8 space-y-8">
      <h2 className="text-xl font-semibold">Simulation Results</h2>

        

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded shadow">
        <div>
            <div className="text-sm text-gray-600">Avg. Monthly Profit</div>
            <div className="text-lg font-bold text-green-700">₪{summary.avgProfit}</div>
        </div>
        <div>
            <div className="text-sm text-gray-600">Fixed Costs Share</div>
            <div className="text-lg font-bold">{summary.fixedShare}%</div>
        </div>
        <div>
            <div className="text-sm text-gray-600">Final Paid Users</div>
            <div className="text-lg font-bold">{summary.finalPaidUsers}</div>
        </div>
        <div>
            <div className="text-sm text-gray-600">Final Monthly Revenue</div>
            <div className="text-lg font-bold">₪{summary.finalRevenue}</div>
        </div>
        <div>
            <div className="text-sm text-gray-600">Break Even</div>
            <div className="text-lg font-bold">{summary.breakEvenMonth === 'Never' ? '—' : `Month ${summary.breakEvenMonth}`}</div>
        </div>
        </div>

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
                    <th className="p-2 border">Fixed</th>
                    <th className="p-2 border">CAC</th>
                    <th className="p-2 border">Total</th>
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
                    <td className="p-2 border text-center">₪{row.fixedCosts}</td>
                    <td className="p-2 border text-center">₪{row.variableCosts}</td>
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
