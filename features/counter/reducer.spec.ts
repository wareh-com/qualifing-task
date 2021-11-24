/* eslint-env jest */
import { initialState } from './reducer';

describe('Counter reducer Stories', () => {
  describe('initialization', () => {
    it('should initialize reducer correctly', () => {
      expect(initialState.count).toEqual(0);
    });
  });
});
