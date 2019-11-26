export const SET_CHARACTERS_SUCCESS = 'SET_CHARACTERS_SUCCESS';
export const SET_CHARACTERS_LOADING = 'SET_CHARACTERS_LOADING';
export const SET_CHARACTERS_ERROR = 'SET_CHARACTERS_ERROR';

interface ISetCharactersSuccess {
  type: typeof SET_CHARACTERS_SUCCESS;
  characters: [];
}

interface ISetCharactersLoading {
  type: typeof SET_CHARACTERS_LOADING;
  isLoading: boolean;
}

interface ISetCharactersError {
  type: typeof SET_CHARACTERS_ERROR;
  message: string;
}

export type SetCharactersType =
  | ISetCharactersSuccess
  | ISetCharactersLoading
  | ISetCharactersError;
