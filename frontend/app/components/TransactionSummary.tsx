import React from 'react';

const TransactionSummaryCards = ({ summary }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Income</h3>
        </div>
        <div className="text-2xl font-bold text-green-600">{summary.totalIncome}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Expenses</h3>
        </div>
        <div className="text-2xl font-bold text-red-600">{summary.totalExpense}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Net Balance</h3>
        </div>
        <div className={`text-2xl font-bold ${summary.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {summary.netBalance}
        </div>
      </div>
    </div>
  );
};

export default TransactionSummaryCards;
