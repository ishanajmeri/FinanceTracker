'use client';

import { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';
export const withCreateTransaction = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function createTransaction(input: any) {
      setLoading(true);
      const payload = {
        data: {
          ...input
        }
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/transactions/create`, payload);
      const data = res?.data || {};

      if (data.success) {
        setTransaction(data.data.transaction);
      }

      if (!data?.success) {
        setError(data.message);
      }
      setLoading(false);
    }

    return <Component {...{ loading, transaction, createError: error, createTransaction }} {...props} />;
  };
  return WithComponent;
};
