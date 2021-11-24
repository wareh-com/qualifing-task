import { fork } from 'redux-saga/effects';
import countSaga from '../counter/saga';

export default function* rootSaga() {
  yield fork(countSaga);
}
