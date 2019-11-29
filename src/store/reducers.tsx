import { combineReducers } from 'redux';
import homeReducer from '../containers/Home/redux/reducer';

export const rootReducer = combineReducers({
  homeReducer
});

export type rootState = ReturnType<typeof rootReducer>;
