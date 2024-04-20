/* eslint-disable global-require */
import createSagaMiddleware from 'redux-saga';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

export const middleware = [sagaMiddleware];

// middlewares only required during development
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    duration: true,
    diff: true,
    timestamp: false,
    collapsed: true,
  });
  middleware.push(logger);
  // eslint-disable-next-line import/no-extraneous-dependencies
  const stateInvariant = require('redux-immutable-state-invariant').default();
  middleware.push(stateInvariant);
}
