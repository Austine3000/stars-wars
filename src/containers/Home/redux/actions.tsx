import axios from '../../../utils/AxiosWrapper';

import * as types from './types';

// Below are actions for fetch characters success, loading and error
export const fetchCharactersSuccess = (
  characters: any[],
  gender: any[]
): types.SetCharactersType => {
  return { type: types.SET_CHARACTERS_SUCCESS, characters, gender };
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
export const fetchMoviesSuccess = (movies: any[]): types.SetMoviesType => {
  return { type: types.SET_MOVIES_SUCCESS, movies };
};

export const fetchMoviesLoading = (isLoading: boolean): types.SetMoviesType => {
  return { type: types.SET_MOVIES_LOADING, isLoading };
};

export const fetchMoviesError = (message: string): types.SetMoviesType => {
  return { type: types.SET_MOVIES_ERROR, message };
};

// Api call to get all movies.
export const fetchMovies = (): any => async (dispatch: any) => {
  let isLoading = true;
  dispatch(fetchMoviesLoading(isLoading));
  try {
    const response = await axios.get('/films/');
    isLoading = false;

    const data = response.data.results.sort(
      (a: any, b: any) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
    dispatch(fetchMoviesSuccess(data));
    dispatch(fetchMoviesLoading(isLoading));
    return response;
  } catch (err) {
    isLoading = false;
    const message = 'Error getting movies';
    dispatch(fetchMoviesError(message));
    dispatch(fetchMoviesLoading(isLoading));
    throw err;
  }
};

// Api call to get all characters
export const fetchCharacters = (id: string): any => async (
  dispatch: any,
  getState: any
) => {
  let isLoading = true;
  const episode = Number(id);
  const { homeReducer } = getState();
  const getMovie = homeReducer.movies.filter((item: any) => {
    return item.episode_id === episode;
  });

  dispatch(fetchCharactersLoading(isLoading));
  try {
    let result: any[] = await Promise.all(
      getMovie[0].characters.map(async (character: any) => {
        const response = await axios.get(`${character}`);
        return {
          name: response.data.name,
          gender:
            response.data.gender === 'male'
              ? 'M'
              : response.data.gender === 'female'
              ? 'F'
              : response.data.gender === 'hermaphrodite'
              ? 'HERM'
              : 'N/A',
          height: Number.isNaN(Number(response.data.height))
            ? response.data.height
            : Number(response.data.height)
        };
      })
    );

    isLoading = false;
    let gender = Array.from(new Set(result.map(x => x.gender)));

    gender = gender.map(element => {
      const value =
        element === 'M'
          ? 'Male'
          : element === 'F'
          ? 'Female'
          : element === 'HERM'
          ? 'Hermaphrodite'
          : 'N/A';
      return {
        name: value,
        value: element
      };
    });

    dispatch(fetchCharactersSuccess(result, gender));

    dispatch(fetchCharactersLoading(isLoading));
  } catch (err) {
    isLoading = false;
    const message = 'Error getting characters';
    dispatch(fetchCharactersError(message));
    dispatch(fetchCharactersLoading(isLoading));
    throw err;
  }
};
