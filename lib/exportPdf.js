import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportScenarioToPDF(scenario) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(scenario.name, 14, 20);

  doc.setFontSize(12);
  doc.text('Input Parameters:', 14, 30);
  const { users, growthRate, conversionRate, price, cac, churnRate, months } = scenario.inputs;

  const inputs = [
    ['Starting Users', users],
    ['Growth Rate (%)', growthRate],
    ['Conversion Rate (%)', conversionRate],
    ['Price (₪)', price],
    ['CAC (₪)', cac],
    ['Churn Rate (%)', churnRate],
    ['Time Horizon (Months)', months]
  ];
  autoTable(doc, {
    startY: 35,
    body: inputs,
    theme: 'grid',
    styles: { fontSize: 10 }
  });

  doc.text('Monthly Results:', 14, doc.lastAutoTable.finalY + 10);
  const body = scenario.results.map(row => [
    row.month, row.users, row.paidUsers, row.revenue, row.expenses, row.profit, row.ltv, row.roi
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Month', 'Users', 'Paid', 'Revenue', 'Expenses', 'Profit', 'LTV', 'ROI']],
    body,
    styles: { fontSize: 9 }
  });

  doc.save(`${scenario.name.replace(/\s+/g, '_')}.pdf`);
}
