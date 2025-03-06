'use client';

import { useState, useEffect, FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
export const withGetOneTransaction = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { params } = props;

    async function getOneTransaction() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/transactions/${params.id}`);
      const data = res?.data || {};

      if (data.success) {
        setTransaction(data.data.transaction);
      }

      if (!data?.success) {
        setError(data.message);
      }
      setLoading(false);
    }

    useEffect(() => {
      getOneTransaction();
    }, []);

    return <Component {...{ loading, transaction, transactionError: error }} {...props} />;
  };
  return WithComponent;
};
