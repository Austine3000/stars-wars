export const SET_CHARACTERS_SUCCESS = 'SET_CHARACTERS_SUCCESS';
export const SET_CHARACTERS_LOADING = 'SET_CHARACTERS_LOADING';
export const SET_CHARACTERS_ERROR = 'SET_CHARACTERS_ERROR';

export const SET_MOVIES_SUCCESS = 'SET_MOVIES_SUCCESS';
export const SET_MOVIES_LOADING = 'SET_MOVIES_LOADING';
export const SET_MOVIES_ERROR = 'SET_MOVIES_ERROR';

interface ISetCharactersSuccess {
  type: typeof SET_CHARACTERS_SUCCESS;
  characters: any[];
  gender: any[];
}

interface ISetCharactersLoading {
  type: typeof SET_CHARACTERS_LOADING;
  isLoading: boolean;
}

interface ISetCharactersError {
  type: typeof SET_CHARACTERS_ERROR;
  message: string;
}

interface ISetMoviesSuccess {
  type: typeof SET_MOVIES_SUCCESS;
  movies: any[];
}

interface ISetMoviesLoading {
  type: typeof SET_MOVIES_LOADING;
  isLoading: boolean;
}

interface ISetMoviesError {
  type: typeof SET_MOVIES_ERROR;
  message: string;
}

export type SetCharactersType =
  | ISetCharactersSuccess
  | ISetCharactersLoading
  | ISetCharactersError;

export type SetMoviesType =
  | ISetMoviesSuccess
  | ISetMoviesLoading
  | ISetMoviesError;
