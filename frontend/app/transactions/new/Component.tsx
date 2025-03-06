'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { categories } from '@/lib/utils';

const Component = props => {
  const router = useRouter();
  const { loading, createTransaction, transaction, transactionError } = props;
  const [selectCategories, setSelectCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    category: '',
    subcategory: '',
    date: new Date().getTime()
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: Number(transaction?.amount).toFixed(0),
        category: transaction.category,
        subcategory: transaction.subcategory,
        date: Number(transaction?.date)
      });
    }
  }, [transaction]);

  useEffect(() => {
    if (!categories) return;
    if (formData.type) {
      setSelectCategories(Object.keys(categories[formData.type]));
    }
    if (formData.type && formData.category) {
      setSubCategories(categories[formData.type][formData.category]);
    }
  }, [formData, categories]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createTransaction(formData);
    console.log('Saving transaction:', formData);
    router.push('/');
  };

  if (transactionError && !loading) {
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

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{transaction ? 'Update' : 'New'} Transaction</h1>
          <button onClick={() => router.back()} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">None</option>
              {selectCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">sub-category</label>
            <select
              value={formData.subcategory}
              onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">None</option>
              {subCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative" ref={calendarRef}>
            <button
              onClick={e => {
                e.preventDefault();
                setIsCalendarOpen(!isCalendarOpen);
              }}
              className="w-full md:w-[300px] px-3 py-2 text-left rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formData.date ? (
                  format(formData.date, 'LLL dd, y')
                ) : (
                  <span className="text-gray-500">Pick a date range</span>
                )}
              </span>
            </button>

            {isCalendarOpen && (
              <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg p-4">
                <DayPicker
                  mode="single"
                  // defaultMonth={date?.from}
                  selected={formData.date}
                  onSelect={e => {
                    setFormData({ ...formData, date: e?.getTime() });
                    setIsCalendarOpen(!isCalendarOpen);
                  }}
                  numberOfMonths={1}
                />
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
            {transaction ? 'Update' : 'Save'} Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Component;
