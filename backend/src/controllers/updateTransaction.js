import Joi from 'joi';
import { updateTransactionData } from '../services/index.js';

export const transactionSchema = Joi.object({
  data: Joi.object({
    type: Joi.string().valid('income', 'expense').required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    amount: Joi.number().positive().required(),
    date: Joi.number().required()
  })
});

function updateTransaction(req, res) {
  try {

    const { error, value } = transactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const transaction = updateTransactionData(req.params.id, value.data);

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

export { updateTransaction }