import { map } from 'ramda';
import { all, fork, put } from 'redux-saga/effects';
import { saga as tweets } from '../modules/tweets';

const sagas = [ tweets ];

const forkAllModuleSagas = map(fork);

export default function* saga() {
  yield all(forkAllModuleSagas(sagas));
  yield put({ type: 'INIT' });
}
