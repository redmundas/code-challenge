import { assoc, nthArg, pipe, prop } from 'ramda';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import rereducer from 'rereducer';
import { REHYDRATE } from 'redux-persist';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTweets as fetchTweets } from '../../api';
import { SOURCES } from '../../config';
import {
  getSources,
  getTweetsCount,
  UPDATE_SOURCES,
  TOGGLE_EDIT_MODE,
} from '../settings'

const initial = SOURCES.reduce((result, source) => assoc(source, {
  data: null,
}, result), {});

// types
export const UPDATE_MESSAGES = 'TWEETS/UPDATE_MESSAGES';

// actions
export const updateMessages = messages => ({
  type: UPDATE_MESSAGES,
  messages,
});

// reducers
export const messagesReducer = rereducer(
  initial,
  [
    UPDATE_MESSAGES,
    pipe(
      nthArg(1),
      prop('messages'),
    ),
  ],
  [
    TOGGLE_EDIT_MODE,
    (state, { enabled }) => enabled ? state : initial,
  ],
);

export const reducer = combineReducers({
  messages: messagesReducer,
});

// selectors
const modulePath = prop('tweets');

export const getMessages = createSelector(modulePath, prop('messages'));

// sagas
export const fetchSources = (sources, settings) => Promise.all(sources.map(source =>
  fetchTweets(source, settings[source]).then(response => ({ source, response }))
));

export function* fetchTweetsSaga() {
  const settings = yield select(getTweetsCount);
  const sources = yield select(getSources);
  const results = yield call(fetchSources, sources, settings);
  const tweets = results.reduce((result, { source, response }) => assoc(source, {
    data: response.data || [],
  }, result), {});
  yield put(updateMessages(tweets));
}

export function* saga() {
  yield takeEvery(
    ({ type, key }) => type === REHYDRATE && key === 'settings',
    fetchTweetsSaga,
  );
  yield takeEvery(UPDATE_SOURCES, fetchTweetsSaga);
  yield takeEvery(
    ({ type, enabled }) => type === TOGGLE_EDIT_MODE && !enabled,
    fetchTweetsSaga,
  );
}
