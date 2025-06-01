export function simulateFreemiumModel({
  users,
  growthRate,
  growthMode,
  conversionRate,
  price,
  cac,
  churnRate,
  fixedCosts,
  months
}) {
  const result = [];

  let currentUsers = users;
  let previousUsers = users;

  for (let month = 1; month <= months; month++) {
    const paidUsers = currentUsers * (conversionRate / 100);
    const revenue = paidUsers * price;

    const newUsers = month === 1 ? 0 : Math.max(currentUsers - previousUsers, 0);
    const variableCosts = newUsers * cac;
    const expenses = variableCosts + fixedCosts;
    const profit = revenue - expenses;
    const ltv = price / (churnRate / 100);
    const roi = ltv / cac;

    result.push({
      month,
      users: Math.round(currentUsers),
      paidUsers: Math.round(paidUsers),
      newUsers: Math.round(newUsers),
      fixedCosts: Math.round(fixedCosts),
      variableCosts: Math.round(variableCosts),
      expenses: Math.round(expenses),
      profit: Math.round(profit),
      ltv: +ltv.toFixed(2),
      roi: +roi.toFixed(2)
    });

    previousUsers = currentUsers;

    // apply growth
    if (growthMode === 'percent') {
      currentUsers *= 1 + growthRate / 100;
    } else if (growthMode === 'fixed') {
      currentUsers += growthRate;
    }
  }

  return result;
}
