import requireContext from 'require-context';

// @ts-ignore
const requireFile = requireContext(__dirname, true, /[\w-]+\.json$/);
const files = requireFile.keys().map((fileName) => requireFile(fileName));

const reports = {};
files.forEach((totals, i) => {
  Object.entries(totals).forEach(([address, amount]: any) => {
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
