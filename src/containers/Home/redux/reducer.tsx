import {
  SET_CHARACTERS_SUCCESS,
  SET_CHARACTERS_LOADING,
  SET_CHARACTERS_ERROR,
  SET_MOVIES_LOADING,
  SET_MOVIES_ERROR,
  SET_MOVIES_SUCCESS
} from './types';

export interface IMovies {
  characters: any[];
  movies: any[];
  isCLoading: boolean;
  isMLoading: boolean;
  gender: any[];
  error: string;
}

const initialState: IMovies = {
  characters: [],
  movies: [],
  isCLoading: false,
  isMLoading: false,
  gender: [],
  error: ''
};

export function HomeReducer(state: IMovies, action: any) {
  switch (action.type) {
    case SET_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.characters,
        gender: action.gender
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
}

const Movies = {
  initialState: initialState,
  HomeReducer: HomeReducer
};

export default Movies;
