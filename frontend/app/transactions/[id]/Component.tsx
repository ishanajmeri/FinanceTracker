import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import React from 'react';

const Component = props => {
  const router = useRouter();
  const { transaction, loading } = props;
  if (!transaction && !loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg">
          <p className="text-red-700">Transaction not found</p>
          <button onClick={() => router.push('/')} className="mt-4 text-blue-500 hover:text-blue-600">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Transaction Details</h1>
          <button onClick={() => router.back()} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Back
          </button>
        </div>
        {loading ? (
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-full ml-auto"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Status</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {transaction.type}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Amount</span>
                <span
                  className={`text-xl font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {Number(transaction.amount).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Category</span>
                <span className="capitalize">{transaction.category}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Date</span>
                <span>{format(new Date(Number(transaction.date)), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between items-center pb-4">
                <span className="text-gray-600">Description</span>
                <span>
                  <p className="text-gray-800">{transaction.subcategory}</p>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Component;
