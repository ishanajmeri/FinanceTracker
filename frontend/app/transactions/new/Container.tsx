import React from 'react';
import Component from './Component';
import { withCreateTransaction } from './Operation';
import compose from 'lodash/flowRight';

const Container = props => {
  return <Component {...props} />;
};

export default compose(withCreateTransaction)(Container);
