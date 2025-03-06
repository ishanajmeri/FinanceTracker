import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const TransactionFilters = ({ onFilterChange, categories }) => {
  const [type, setType] = useState('all');
  const categoriesData = ['all', ...categories];
  const [category, setCategory] = useState('all');
  const [date, setDate] = useState();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTypeChange = event => {
    const value = event.target.value;
    setType(value);
    onFilterChange('type', value === 'all' ? undefined : value);
  };

  const handleCategoryChange = event => {
    const value = event.target.value;
    setCategory(value);
    onFilterChange('category', value === 'all' ? undefined : value);
  };

  const handleDateChange = range => {
    setDate(range);
    console.log(range);
    if (range?.from) {
      onFilterChange('from', range.from ? new Date(range.from).getTime() : undefined);
    }
    if (range?.to) {
      onFilterChange('to', range.to ? new Date(range.to).getTime() : undefined);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
      <select
        value={type}
        onChange={handleTypeChange}
        className="w-full md:w-[180px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full md:w-[180px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categoriesData.map(cat => (
          <option key={cat.toLowerCase()} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>

      <div className="relative" ref={calendarRef}>
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
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
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-gray-500">Pick a date range</span>
            )}
          </span>
        </button>

        {isCalendarOpen && (
          <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg p-4">
            <DayPicker
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;
