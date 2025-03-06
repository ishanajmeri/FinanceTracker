import React from 'react';
import { withGetOneTransaction } from './Operations';
import Component from './Component';

const Container = props => {
  return <Component {...props} />;
};

export default withGetOneTransaction(Container);
