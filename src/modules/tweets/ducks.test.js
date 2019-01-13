import { call, put, select } from 'redux-saga/effects';
import {
  fetchSources,
  fetchTweetsSaga,
  getMessages,
  messagesReducer,
  updateMessages,
  UPDATE_MESSAGES,
} from './ducks';
import { getSources, getTweetsCount } from '../settings'

const getNext = (saga, ...rest) => {
  const generator = saga(...rest);
  return (...args) => generator.next(...args).value;
};

describe('actions', () => {
  it('updateMessages', () => {
    const messages = [{
      id: 'test',
    }];
    const action = updateMessages(messages);
    expect(action).toEqual({ type: UPDATE_MESSAGES, messages });
  });
});

describe('reducers', () => {
  it('messagesReducer', () => {
    const messages = [{
      id: 'test',
    }];
    const state = messagesReducer(null, updateMessages(messages));
    expect(state).toEqual(messages);
  });
});

describe('selectors', () => {
  it('getMessages', () => {
    const messages = { test: { data: [] } };
    const state = { tweets: { messages } };
    const result = getMessages(state);
    expect(result).toEqual(messages);
  });
});

describe('sagas', () => {
  const source = 'test';
  const data = [];
  const sources = [source];
  const settings = { test: 10 };
  const results = [{ source, response: { data } }]
  it('fetchTweetsSaga', () => {
    const next = getNext(fetchTweetsSaga);

    const seelectGetTweetsCount = next();
    expect(seelectGetTweetsCount).toEqual(select(getTweetsCount));
    const seelectGetSources = next(settings);
    expect(seelectGetSources).toEqual(select(getSources));
    const callFetchSources = next(sources);
    expect(callFetchSources).toEqual(call(fetchSources, sources, settings));
    const putUpdateMessages = next(results);
    expect(putUpdateMessages).toEqual(put(updateMessages({
      test: { data },
    })));
  });
});
