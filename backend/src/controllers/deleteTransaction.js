import { deleteTransactionData } from "../services/index.js";

function deleteTransaction(req, res) {
  try {
    const success = deleteTransactionData(req.params.id);
    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export { deleteTransaction }