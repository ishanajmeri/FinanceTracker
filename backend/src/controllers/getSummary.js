import { readTransactions } from "../services/index.js";

function getSummary(req, res) {
  try {
    const { from, to } = req.query;
    const transactions = readTransactions();
    let filteredTransactions = transactions;
    // Apply date filtering if provided
    if (from || to) {
      filteredTransactions = transactions.filter(transaction => {
        const transactionDate = parseInt(transaction.date);
        const start = from ? parseInt(from) : 0;
        const end = to ? parseInt(to) : Date.now();
        return transactionDate >= start && transactionDate <= end;
      });
    }
    // Calculate totals
    const summary = filteredTransactions.reduce(
      (acc, transaction) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === 'income') {
          acc.totalIncome += amount;
        } else if (transaction.type === 'expense') {
          acc.totalExpense += amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
    // Calculate net balance
    summary.netBalance = summary.totalIncome - summary.totalExpense;
    // Round all numbers to 2 decimal places
    summary.totalIncome = Number(summary.totalIncome).toFixed(0);
    summary.totalExpense = Number(summary.totalExpense).toFixed(0);
    summary.netBalance = Number(summary.netBalance).toFixed(0);

    res.status(200).json({
      success: true,
      data: {
        summary
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export { getSummary };