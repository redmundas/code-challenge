import { assoc, nthArg, pipe, prop } from 'ramda';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import rereducer from 'rereducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { SOURCES, TWEETS_COUNT } from '../../config';

// types
export const UPDATE_SOURCES = 'SETTINGS/UPDATE_SOURCES';
export const UPDATE_ORDER = 'SETTINGS/UPDATE_ORDER';
export const TOGGLE_EDIT_MODE = 'SETTINGS/TOGGLE_EDIT_MODE';
export const UPDATE_TWEETS_COUNT = 'SETTINGS/UPDATE_TWEETS_COUNT';

// actions
export const updateSources = sources => ({
  type: UPDATE_SOURCES,
  sources,
});

export const updateOrder = (source, change) => ({
  type: UPDATE_ORDER,
  source,
  change,
});

export const toggleEditMode = enabled => ({
  type: TOGGLE_EDIT_MODE,
  enabled,
});

export const updateTweetsCount = (source, count) => ({
  type: UPDATE_TWEETS_COUNT,
  source,
  count,
});

// reducers
export const sourcesReducer = rereducer(
  SOURCES,
  [
    UPDATE_SOURCES,
    pipe(
      nthArg(1),
      prop('sources'),
    ),
  ],
  [
    UPDATE_ORDER,
    (state, { source, change }) => {
      const idx = state.indexOf(source);
      if (change > 0) {
        return state.slice(0, idx)
          .concat(state[idx + 1])
          .concat(state[idx])
          .concat(state.slice(idx + 2))
      } else {
        return state.slice(0, idx - 1)
          .concat(state[idx])
          .concat(state[idx - 1])
          .concat(state.slice(idx + 1))
      }
    },
  ]
);

export const editModeReducer = rereducer(
  false,
  [
    TOGGLE_EDIT_MODE,
    pipe(
      nthArg(1),
      prop('enabled'),
    ),
  ],
);

export const tweetsCountReducer = rereducer(
  SOURCES.reduce((result, source) => assoc(source, TWEETS_COUNT, result), {}),
  [
    UPDATE_TWEETS_COUNT,
    (state, { source, count }) => assoc(source, count, state),
  ],
);
 
export const reducer = persistReducer(
  {
    key: 'settings',
    storage,
  },
  combineReducers({
    sources: sourcesReducer,
    editMode: editModeReducer,
    tweetsCount: tweetsCountReducer,
  }),
);

// selectors
const modulePath = prop('settings');

export const getSources = createSelector(modulePath, prop('sources'));
export const getEditMode = createSelector(modulePath, prop('editMode'));
export const getTweetsCount = createSelector(modulePath, prop('tweetsCount'));
