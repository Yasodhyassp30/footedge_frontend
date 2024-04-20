import { configureStore } from '@reduxjs/toolkit';
import { middleware, sagaMiddleware } from './middleware';
import { rootReducer } from './reducers';
import rootSaga from './sagas';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware).concat(middleware),
  preloadedState: {},
  devTools: true,
});

sagaMiddleware.run(rootSaga);
