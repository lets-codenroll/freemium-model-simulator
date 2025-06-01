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

    let activeUsers = users;
    let startOfMonthUsers = users;

    for (let month = 1; month <= months; month++) {
        const churned = startOfMonthUsers * (churnRate / 100);

        // גידול חדש לפי סוג הצמיחה
        const newUsers =
            month === 1 ? 0 :
            growthMode === 'percent'
                ? startOfMonthUsers * (growthRate / 100)
                : growthRate;

        // משתמשים פעילים אחרי נטישה + צמיחה
        activeUsers = startOfMonthUsers - churned + newUsers;

        // משתמשים משלמים והכנסות
        const paidUsers = activeUsers * (conversionRate / 100);
        const revenue = paidUsers * price;

        // הוצאות לפי משתמשים חדשים בלבד
        const variableCosts = newUsers * cac;
        const expenses = variableCosts + fixedCosts;
        const profit = revenue - expenses;

        // LTV ו-ROI
        const ltv = price / (churnRate / 100);
        const roi = ltv / cac;

        result.push({
            month,
            users: Math.round(startOfMonthUsers),
            newUsers: Math.round(newUsers),
            churned: Math.round(churned),
            activeUsers: Math.round(activeUsers),
            paidUsers: Math.round(paidUsers),
            revenue: Math.round(revenue),
            fixedCosts: Math.round(fixedCosts),
            variableCosts: Math.round(variableCosts),
            expenses: Math.round(expenses),
            profit: Math.round(profit),
            ltv: +ltv.toFixed(2),
            roi: +roi.toFixed(2)
        });

        startOfMonthUsers = activeUsers;

    }

  return result;
}
