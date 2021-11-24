import { RootState } from '../redux';

export function getCount(state: RootState): number {
  return state.counter.count;
}

export function isFetching(state: RootState): boolean {
  return state.counter.isFetching;
}
