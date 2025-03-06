import fs from 'fs';
import { parse } from "csv-parse/sync"
import { v4 as uuidv4 } from 'uuid';

export const categories = {
  income: {
    salary: ['Monthly Salary', 'Bonus', 'Commission'],
    investment: ['Dividends', 'Stock Sales', 'Interest'],
    business: ['Consulting', 'Freelance', 'Services']
  },
  expense: {
    housing: ['Rent', 'Utilities', 'Maintenance'],
    food: ['Groceries', 'Restaurants', 'Takeout'],
    transportation: ['Fuel', 'Public Transit', 'Car Maintenance']
  }
};


function randomAmount(min, max) {
  return (Math.random() * (max - min) + min);
}

function generateTransactions(count = 20) {
  const transactions = [];
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;

  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.5 ? 'income' : 'expense';
    const categoryKeys = Object.keys(categories[type]);
    const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const subcategories = categories[type][category];
    const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];

    const amount = type === 'income'
      ? randomAmount(500, 5000)
      : randomAmount(10, 500);

    transactions.push({
      id: uuidv4(),
      date: now - Math.floor(Math.random() * 30) * dayInMs,
      type,
      category,
      subcategory,
      amount
    });
  }

  return transactions;
}

function generateCsvFile() {
  const records = readTransactions()
  if (records.length) {
    return records;
  }
  const transactions = generateTransactions();
  const header = 'id,date,type,category,subcategory,amount\n';
  const csvContent = transactions
    .map(t => `${t.id},${t.date},${t.type},${t.category},${t.subcategory},${t.amount}`)
    .join('\n');

  fs.writeFileSync('./data/transactions.csv', header + csvContent);
  return transactions;
}

function readTransactions() {
  try {
    const fileContent = fs.readFileSync('./data/transactions.csv', 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  } catch (e) {
    console.error('Error reading transactions file:', e.message);
    return [];
  }
}

function createTransactionData(transactionData) {
  const newTransaction = {
    id: uuidv4(),
    date: Date.now(),
    ...transactionData
  };
  try {
    const transactions = readTransactions();
    transactions.push(newTransaction);
    const header = 'id,date,type,category,subcategory,amount\n';
    const csvContent = transactions
      .map(t => `${t.id},${t.date},${t.type},${t.category},${t.subcategory},${t.amount}`)
      .join('\n');
    fs.writeFileSync('./data/transactions.csv', header + csvContent);
    return newTransaction;
  } catch (e) {
    console.error('Error creating transaction:', e.message);
    return null;
  }
}

function updateTransactionData(id, transactionData) {
  const transactions = readTransactions();
  const index = transactions.findIndex(t => t.id === id);

  if (index === -1) {
    return null;
  }

  try {
    const updatedTransaction = {
      ...transactions[index],
      ...transactionData,
      id, // Preserve the original ID
      date: transactions[index].date // Preserve the original date
    };
    transactions[index] = updatedTransaction;
    const header = 'id,date,type,category,subcategory,amount\n';
    const csvContent = transactions
      .map(t => `${t.id},${t.date},${t.type},${t.category},${t.subcategory},${t.amount}`)
      .join('\n');
    fs.writeFileSync('./data/transactions.csv', header + csvContent);
    return updatedTransaction;
  } catch (e) {
    console.error('Error updating transaction:', e.message);
    return null;
  }
}

function deleteTransactionData(id) {
  const transactions = readTransactions();
  const index = transactions.findIndex(t => t.id === id);

  if (index === -1) {
    return false;
  }
  try {
    transactions.splice(index, 1);

    const header = 'id,date,type,category,subcategory,amount\n';
    const csvContent = transactions
      .map(t => `${t.id},${t.date},${t.type},${t.category},${t.subcategory},${t.amount}`)
      .join('\n');

    fs.writeFileSync('./data/transactions.csv', header + csvContent);

    return true;
  } catch (e) {
    console.error('Error deleting transaction:', e.message);
    return false;
  }
}

export {
  updateTransactionData,
  deleteTransactionData,
  generateCsvFile,
  readTransactions,
  createTransactionData
};