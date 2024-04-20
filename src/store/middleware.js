import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'dev') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    duration: true,
    diff: true,
    timestamp: false,
    collapsed: true,
  });
  middleware.push(logger);
  const stateInvariant = require('redux-immutable-state-invariant').default();
  middleware.push(stateInvariant);
}
