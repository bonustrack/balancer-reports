import _1 from '@/reports/1/_totals.json';
import _2 from '@/reports/2/_totals.json';
import _3 from '@/reports/3/_totals.json';

const reports = {};

[_1, _2, _3].forEach((totals, i) => {
  Object.entries(totals).forEach(([address, amount]) => {
    if (!reports[address]) reports[address] = {};
    reports[address][i + 1] = parseFloat(amount);
    if (!reports[address].total) reports[address].total = 0;
    reports[address].total += parseFloat(amount);
  });
});

export default Object.fromEntries(
  // @ts-ignore
  Object.entries(reports).sort((a, b) => (a[1].total < b[1].total ? 1 : -1)),
);
