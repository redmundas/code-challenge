import {
  updateSources,
  updateOrder,
  toggleEditMode,
  updateTweetsCount,
  sourcesReducer,
  editModeReducer,
  tweetsCountReducer,
  getSources,
  getEditMode,
  getTweetsCount,
  UPDATE_SOURCES,
  UPDATE_ORDER,
  TOGGLE_EDIT_MODE,
  UPDATE_TWEETS_COUNT,
} from './ducks';

const getAction = (type, params) => ({ type, ...params });

describe('actions', () => {
  it('updateSources', () => {
    const sources = ['test'];
    const action = updateSources(sources);
    expect(action).toEqual(getAction(UPDATE_SOURCES, { sources }));
  });

  it('updateOrder', () => {
    const source = 'test';
    const change = 1;
    const action = updateOrder(source, change);
    expect(action).toEqual(getAction(UPDATE_ORDER, { source, change }));
  });

  it('toggleEditMode', () => {
    const enabled = true;
    const action = toggleEditMode(enabled);
    expect(action).toEqual(getAction(TOGGLE_EDIT_MODE, { enabled }));
  });

  it('updateTweetsCount', () => {
    const source = 'test';
    const count = 10;
    const action = updateTweetsCount(source, count);
    expect(action).toEqual(getAction(UPDATE_TWEETS_COUNT, { source, count }));
  });
});

describe('reducers', () => {
  it('sourcesReducer - updateSources', () => {
    const sources = ['test'];
    const state = sourcesReducer(null, updateSources(sources));
    expect(state).toEqual(sources);
  });

  it('sourcesReducer - updateOrder', () => {
    const state = sourcesReducer(
      ['test1', 'test2', 'test3'],
      updateOrder('test3', -1),
    );
    expect(state).toEqual(['test1', 'test3', 'test2']);
  });

  it('editModeReducer', () => {
    const state = editModeReducer(
      false,
      toggleEditMode(true),
    );
    expect(state).toEqual(true);
  });

  it('tweetsCountReducer', () => {
    const state = tweetsCountReducer(
      { test: 10 },
      updateTweetsCount('test', 30),
    );
    expect(state).toEqual({ test: 30 });
  });
});

describe('selectors', () => {
  const sources = ['test'];
  const editMode = true;
  const tweetsCount = { test: 10 };
  const state = {
    settings: {
      sources, editMode, tweetsCount,
    }
  };

  it('getSources', () => {
    expect(getSources(state)).toEqual(sources);
  });

  it('getEditMode', () => {
    expect(getEditMode(state)).toEqual(editMode);
  });

  it('getTweetsCount', () => {
    expect(getTweetsCount(state)).toEqual(tweetsCount);
  });
});
