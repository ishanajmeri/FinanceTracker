import express from 'express';
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getOneTransaction
} from '../controllers/index.js';
const router = express.Router();

router.get('/', getTransactions);
router.get('/summary', getSummary);
router.get('/:id', getOneTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);


export { router };
