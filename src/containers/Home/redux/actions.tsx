import { AppThunk } from '../../../store/configureStore';
import AxiosWrapper from '../../../utils/AxiosWrapper';

import * as types from './types';

export const fetchCharactersSuccess = (
  characters: []
): types.SetCharactersType => {
  return { type: types.SET_CHARACTERS_SUCCESS, characters };
};

export const fetchCharactersLoading = (
  isLoading: boolean
): types.SetCharactersType => {
  return { type: types.SET_CHARACTERS_LOADING, isLoading };
};

export const fetchCharactersError = (
  message: string
): types.SetCharactersType => {
  return { type: types.SET_CHARACTERS_ERROR, message };
};

export const fetchCharacters = (): AppThunk => async dispatch => {
  let isLoading = true;
  dispatch(fetchCharactersLoading(isLoading));
  try {
    const response = await AxiosWrapper.get('/characters');
    isLoading = false;
    dispatch(fetchCharactersSuccess(response.data));
    dispatch(fetchCharactersLoading(isLoading));
  } catch (err) {
    isLoading = false;
    const message = 'Error getting characters';
    dispatch(fetchCharactersError(message));
    dispatch(fetchCharactersLoading(isLoading));
    throw err;
  }
};
