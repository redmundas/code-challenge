import { once } from 'ramda';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import logger from '../lib/logger';
import createReducer from './rootReducer';
import saga from './sagas';

// basic logger middleware
const loggerMiddleware = () => next => action => {
  const { type, ...params } = action;
  logger.debug('ACTION', type, params);
  return next(action);
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default once(history => {
  const rootReducer = createReducer(history);
  const store = createStore(
    rootReducer,
    composeEnhancer(
      applyMiddleware(
        loggerMiddleware,
        sagaMiddleware,
        routerMiddleware(history),
      ),
    ),
  );

  const rootTask = sagaMiddleware.run(saga);
  rootTask.done.catch(error => {
    logger.error('UNCAUGHT SAGA ERROR', error);
  });

  return { store, persistor: persistStore(store) };
});
