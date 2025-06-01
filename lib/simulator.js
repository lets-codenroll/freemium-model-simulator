export function simulateFreemiumModel({
  users,
  growthRate,
  growthMode,
  conversionRate,
  price,
  cac,
  churnRate,
  months
}) {
  const result = [];
  let currentUsers = users;

  for (let month = 1; month <= months; month++) {
    const paidUsers = currentUsers * (conversionRate / 100);
    const revenue = paidUsers * price;
    const expenses = currentUsers * cac;
    const profit = revenue - expenses;
    const ltv = price / (churnRate / 100);
    const roi = ltv / cac;

    result.push({
      month,
      users: Math.round(currentUsers),
      paidUsers: Math.round(paidUsers),
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      profit: Math.round(profit),
      ltv: +ltv.toFixed(2),
      roi: +roi.toFixed(2)
    });

    if (growthMode === 'percent') {
      currentUsers *= 1 + growthRate / 100;
    } else if (growthMode === 'fixed') {
      currentUsers += growthRate;
    }
  }

  return result;
}
