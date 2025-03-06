import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
const TableComponent = ({ transactions, deleteTransaction, getAllTransactions }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map(transaction => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{format(new Date(Number(transaction.date)), 'MMM dd, yyyy')}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{transaction.category}</td>
              <td className="px-6 py-4">{transaction.subcategory}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  {Number(transaction.amount).toFixed(0)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2 justify-end">
                <button
                  onClick={() => {
                    router.push(`/transactions/${transaction.id}`);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    router.push(`/transactions/edit/${transaction.id}`);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteTransaction(transaction.id);
                    getAllTransactions();
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
