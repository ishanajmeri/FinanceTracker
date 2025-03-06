import React from 'react';
import Component from './Component';
import { withDeleteTransaction, withGetAllTransaction, withGetSummary } from './Operation';
import compose from 'lodash/flowRight';

const Container = props => {
  return <Component {...props} />;
};

export default compose(withGetAllTransaction, withGetSummary, withDeleteTransaction)(Container);
