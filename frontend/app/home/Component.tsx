import React from 'react';
import { useRouter } from 'next/navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import TransactionFilters from '../components/TransactionFilters';
import TransactionSummaryCards from '../components/TransactionSummary';
import TableComponent from '../components/TableComponent';

const Component = props => {
  const router = useRouter();
  const { loadingList, transactionList, getAllTransactions, error, handleFilterChange, categories, summary } = props;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Personal Finance Tracker</h1>
      {loadingList ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="space-y-4">
          <ErrorMessage message={error} />
          <button onClick={getAllTransactions} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <TransactionFilters onFilterChange={handleFilterChange} categories={categories} />
          <TransactionSummaryCards summary={summary} />
          <div className="rounded-lg border bg-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Transaction History</h2>
                <button
                  onClick={() => router.push('/transactions/new')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Transaction
                </button>
              </div>
              <TableComponent
                transactions={transactionList}
                deleteTransaction={props.deleteTransaction}
                getAllTransactions={props.getAllTransactions}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Component;
