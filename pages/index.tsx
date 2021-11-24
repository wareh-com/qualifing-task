import Counter from 'components/counter/counter';
import { RootAction } from 'features/redux/root-action';
import { RootState } from 'features/redux/root-reducer';
import { NextFunctionComponent } from 'next';
import React from 'react';
import { Store } from 'redux';

const Index: NextFunctionComponent<{}, Store<RootState, RootAction>> = () => {
  return (
    <div>
      <Counter />
    </div>);
};

export default Index;
