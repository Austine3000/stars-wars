import {
  SET_CHARACTERS_SUCCESS,
  SET_CHARACTERS_LOADING,
  SET_CHARACTERS_ERROR,
  SET_MOVIES_LOADING,
  SET_MOVIES_ERROR,
  SET_MOVIES_SUCCESS,
  SetMoviesType,
  SetCharactersType
} from './types';

interface ICharacters {
  characters: any[];
  movies: any[];
  isCLoading: boolean;
  isMLoading: boolean;
  error: string;
}

const initialState: ICharacters = {
  characters: [],
  movies: [],
  isCLoading: false,
  isMLoading: false,
  error: ''
};

export default (
  state = initialState,
  action: SetCharactersType | SetMoviesType
) => {
  switch (action.type) {
    case SET_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.characters
      };
    case SET_CHARACTERS_LOADING:
      return {
        ...state,
        isCLoading: action.isLoading
      };
    case SET_CHARACTERS_ERROR:
      return {
        ...state,
        error: action.message
      };
    case SET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.movies
      };
    case SET_MOVIES_LOADING:
      return {
        ...state,
        isMLoading: action.isLoading
      };
    case SET_MOVIES_ERROR:
      return {
        ...state,
        error: action.message
      };
    default:
      return state;
  }
};
