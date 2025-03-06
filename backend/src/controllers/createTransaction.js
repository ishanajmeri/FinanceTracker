import { createTransactionData } from "../services/index.js";
import { transactionSchema } from "./updateTransaction.js";


function createTransaction(req, res) {
  const { error, value } = transactionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  try {
    const transaction = createTransactionData(value.data);
    res.status(200).json({
      success: true,
      data: {
        transaction
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export { createTransaction }