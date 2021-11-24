import Counter from 'components/counter/counter';
import { fetchCounter } from 'features/counter/actions';
import { RootAction } from 'features/redux/root-action';
import { RootState } from 'features/redux/root-reducer';
import { NextContext, NextSFC } from 'next';
import React from 'react';
import { Store } from 'redux';

const CounterPage: NextSFC<{}, {}, NextContext & { store: Store<RootState, RootAction> }> = () => {
  return (
    <div>
      <Counter />
    </div>);
};

CounterPage.getInitialProps = async ({ store }) => {
  store.dispatch(fetchCounter());
  return {};
};

export default CounterPage;
