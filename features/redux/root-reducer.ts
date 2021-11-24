import { combineReducers } from 'redux';
import { RootAction } from '.';
import counter from '../counter/reducer';

const reducerMap = {
  counter,
};

type RootState = { [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]> };
const rootReducer = combineReducers<RootState, RootAction>(reducerMap);

export { RootState, rootReducer };
