import { useState } from 'react';

export default function InputForm({ onSubmit }) {
  const [form, setForm] = useState({
    users: 1000,
    growthMode: 'percent',
    growthRate: 5,
    conversionRate: 3,
    price: 19.9,
    cac: 5,
    churnRate: 4,
    fixedCosts: 500,
    months: 12,
  });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: parseFloat(value) });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold">Simulation Parameters</h2>

        <div className="grid grid-cols-2 gap-4">
            <label>
            Starting Users
            <input type="number" name="users" value={form.users} onChange={handleChange} className="input" />
            </label>

            <label>
            Growth Type
            <select
                name="growthMode"
                value={form.growthMode}
                onChange={(e) => setForm({ ...form, growthMode: e.target.value })}
                className="input"
            >
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed number</option>
            </select>
            </label>

            <label>
            Growth Rate {form.growthMode === 'percent' ? '(%)' : '(users/month)'}
            <input
                type="number"
                name="growthRate"
                value={form.growthRate}
                onChange={handleChange}
                className="input"
            />
            </label>

            <label>
            Conversion Rate (%)
            <input type="number" name="conversionRate" value={form.conversionRate} onChange={handleChange} className="input" />
            </label>
            <label>
            Monthly Price (₪)
            <input type="number" name="price" value={form.price} onChange={handleChange} className="input" />
            </label>

            <label>
            Fixed Monthly Costs (₪)
            <input
                type="number"
                name="fixedCosts"
                value={form.fixedCosts}
                onChange={handleChange}
                className="input"
            />
            </label>

            <label>
            CAC (₪)
            <input type="number" name="cac" value={form.cac} onChange={handleChange} className="input" />
            </label>
            <label>
            Churn Rate (%)
            <input type="number" name="churnRate" value={form.churnRate} onChange={handleChange} className="input" />
            </label>
            <label>
            Time Horizon (Months)
            <input type="number" name="months" value={form.months} onChange={handleChange} className="input" />
            </label>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Simulate
        </button>
        </form>
    );
}
