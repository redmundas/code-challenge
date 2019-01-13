import { once } from 'ramda';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { reducer as settings } from '../modules/settings';
import { reducer as tweets } from '../modules/tweets';

export default once((history) =>
  combineReducers({
    router: connectRouter(history),
    settings,
    tweets,
  }),
);
