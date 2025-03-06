import React from 'react';
import { withUpdateTransaction } from './Operation';
import compose from 'lodash/flowRight';
import { withGetOneTransaction } from '../../[id]/Operations';
import Component from '../../new/Component';

const Container = props => {
  return <Component {...props} />;
};

export default compose(withGetOneTransaction, withUpdateTransaction)(Container);
