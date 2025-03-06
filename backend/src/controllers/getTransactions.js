import { categories, readTransactions } from "../services/index.js";

function getTransactions(req, res) {
  const {
    type,
    category,
    subcategory,
    from,
    to,
    minAmount,
    maxAmount,
  } = req.query;
  try {

    let transactions = readTransactions();

    if (type) {
      transactions = transactions.filter(t =>
        t.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (category) {
      transactions = transactions.filter(t =>
        t.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (subcategory) {
      transactions = transactions.filter(t =>
        t.subcategory.toLowerCase() === subcategory.toLowerCase()
      );
    }

    if (from || to) {
      transactions = transactions.filter(t => {
        const transactionDate = parseInt(t.date);
        const start = from ? parseInt(from) : 0;
        const end = to ? parseInt(to) : Date.now();
        return transactionDate >= start && transactionDate <= end;
      });
    }

    if (minAmount || maxAmount) {
      transactions = transactions.filter(t => {
        const amount = parseFloat(t.amount);
        const min = minAmount ? parseFloat(minAmount) : 0;
        const max = maxAmount ? parseFloat(maxAmount) : Infinity;
        return amount >= min && amount <= max;
      });
    }

    function categoriesData() {
      const incomeCategories = Object.keys(categories.income);
      const expenseCategories = Object.keys(categories.expense);
      return [...incomeCategories, ...expenseCategories];
    }

    res.status(200).json({
      success: true,
      data: {
        list: transactions,
        categories: categoriesData()
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export { getTransactions };