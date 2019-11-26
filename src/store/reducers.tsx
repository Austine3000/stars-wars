import { combineReducers } from 'redux';
import home from '../containers/Home/redux/reducer';

export const rootReducer = combineReducers({
  home
});

export type rootState = ReturnType<typeof rootReducer>;
