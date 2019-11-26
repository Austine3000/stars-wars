import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { createStore, applyMiddleware, compose, Action } from 'redux';
import { rootReducer, rootState } from './reducers';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middleware.push(logger);
}

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  rootState,
  null,
  Action<string>
>;

export default store;
