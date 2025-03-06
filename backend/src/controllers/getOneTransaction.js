import { readTransactions } from "../services/index.js";

function getOneTransaction(req, res) {
  try {
    const transactions = readTransactions();
    const transaction = transactions.find(t => t.id === req.params.id);
    if (!transaction) {
      return res.status(400).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    res.status(200).json({
      success: true,
      data: { transaction }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export { getOneTransaction }