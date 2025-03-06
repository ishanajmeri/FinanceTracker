import { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';

function getFilter(filter) {
  const filters = Object.keys(filter).filter(key => filter[key] !== undefined);
  return filters.map(key => `${key}=${filter[key]}`).join('&');
}
export const withGetAllTransaction = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    const [transactionList, setTransactionList] = useState({});
    const [filter, setFilter] = useState({});
    const [categories, setCategories] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [error, setError] = useState(null);

    function handleFilterChange(key, value) {
      setFilter({ ...filter, [key]: value });
    }

    async function getAllTransactions() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/transactions?${getFilter(filter)}`);
      const data = res?.data || {};

      if (data.success) {
        setTransactionList(data.data.list);
        setCategories(data.data.categories);
      }

      if (!data?.success) {
        setError(data.message);
      }
      setLoadingList(false);
    }

    useEffect(() => {
      getAllTransactions();
    }, [filter]);

    return (
      <Component
        {...{
          loadingList,
          transactionList,
          error,
          handleFilterChange,
          categories,
          filter,
          getAllTransactions
        }}
        {...props}
      />
    );
  };
  return WithComponent;
};

export const withGetSummary = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    const [summary, setSummary] = useState({});
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [error, setError] = useState(null);

    async function getSummary() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/transactions/summary?${getFilter(props.filter)}`);
      const data = res?.data || {};

      if (data.success) {
        setSummary(data.data.summary);
      }

      if (!data?.success) {
        setError(data.message);
      }
      setLoadingSummary(false);
    }

    useEffect(() => {
      getSummary();
    }, []);

    return <Component {...{ summary, error, loadingSummary }} {...props} />;
  };
  return WithComponent;
};

export const withDeleteTransaction = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    async function deleteTransaction(id) {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/transactions/${id}`);
      const data = res?.data || {};
      return data.success;
    }

    return <Component {...{ deleteTransaction }} {...props} />;
  };
  return WithComponent;
};
