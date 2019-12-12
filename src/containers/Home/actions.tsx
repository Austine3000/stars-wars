import fetchApi from '../../utils/FetchWrapper';
import Memoize from '../../Helpers/MemoizeMethod';
import CompareMethod from '../../Helpers/CompareMethod';

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
export const fetchMovies = (dispatch: any): any => {
  return (async () => {
    let isLoading = true;
    dispatch(fetchMoviesLoading(isLoading));
    try {
      const result = await fetchApi('/films/');
      const response = await result.json();

      isLoading = false;
      const data = [...response.results].sort(
        CompareMethod('release_date', 'asc')
      );
      console.log('data', data);
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
  })();
};

const fetchCharacterRequest = (movie: { characters: string[] }) => {
  return (async () => {
    const result = await Promise.all(
      movie.characters.map(async (character: any) => {
        const result = await fetchApi(`${character}`);
        const response = await result.json();
        return {
          name: response.name,
          gender:
            response.gender === 'male'
              ? 'M'
              : response.gender === 'female'
              ? 'F'
              : response.gender === 'hermaphrodite'
              ? 'HERM'
              : 'N/A',
          height: Number.isNaN(Number(response.height))
            ? response.height
            : Number(response.height)
        };
      })
    );
    return result;
  })();
};

export const CharacterRequest = Memoize(fetchCharacterRequest);

// Api call to get all characters
export const fetchCharacters = (
  dispatch: any,
  movie: { characters: string[] }
): any => {
  return (async () => {
    let isLoading = true;

    dispatch(fetchCharactersLoading(isLoading));
    try {
      const result: any = await CharacterRequest(movie);

      isLoading = false;
      let gender = Array.from(new Set(result.map((x: any) => x.gender)));

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
      return result;
    } catch (err) {
      isLoading = false;
      const message = 'Error getting characters';
      dispatch(fetchCharactersError(message));
      dispatch(fetchCharactersLoading(isLoading));
      throw err;
    }
  })();
};
