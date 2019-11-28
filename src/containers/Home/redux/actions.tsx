import { AppThunk } from '../../../store/configureStore';
import AxiosWrapper from '../../../utils/AxiosWrapper';

import * as types from './types';

// Below are actions for fetch characters success, loading and error
export const fetchCharactersSuccess = (
  characters: any[]
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

// Below are actions for fetch movies success, loading and error
export const fetchMoviesSuccess = (movies: []): types.SetMoviesType => {
  return { type: types.SET_MOVIES_SUCCESS, movies };
};

export const fetchMoviesLoading = (isLoading: boolean): types.SetMoviesType => {
  return { type: types.SET_MOVIES_LOADING, isLoading };
};

export const fetchMoviesError = (message: string): types.SetMoviesType => {
  return { type: types.SET_MOVIES_ERROR, message };
};

// Api call to get all movies.
export const fetchMovies = (): AppThunk => async dispatch => {
  let isLoading = true;
  dispatch(fetchMoviesLoading(isLoading));
  try {
    const response = await AxiosWrapper.get('/films/');
    isLoading = false;
    dispatch(fetchMoviesSuccess(response.data.results));
    dispatch(fetchMoviesLoading(isLoading));
  } catch (err) {
    isLoading = false;
    const message = 'Error getting movies';
    dispatch(fetchMoviesError(message));
    dispatch(fetchMoviesLoading(isLoading));
    throw err;
  }
};

// Api call to get all characters
export const fetchCharacters = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  let isLoading = true;
  const episode = Number(id);
  const { homeReducer } = getState();
  const getMovie = homeReducer.movies.filter(item => {
    return item.episode_id === episode;
  });

  dispatch(fetchCharactersLoading(isLoading));
  try {
    let result: any[] = await Promise.all(
      getMovie[0].characters.map(async (character: any) => {
        const response = await AxiosWrapper.get(`${character}`);
        return {
          name: response.data.name,
          gender: response.data.gender,
          height: response.data.height
        };
      })
    );

    isLoading = false;
    dispatch(fetchCharactersSuccess(result));

    dispatch(fetchCharactersLoading(isLoading));
  } catch (err) {
    isLoading = false;
    const message = 'Error getting characters';
    dispatch(fetchCharactersError(message));
    dispatch(fetchCharactersLoading(isLoading));
    throw err;
  }
};
