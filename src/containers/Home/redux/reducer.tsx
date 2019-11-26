import {
  SET_CHARACTERS_SUCCESS,
  SET_CHARACTERS_LOADING,
  SetCharactersType
} from './types';

interface ICharacters {
  characters: [];
  isLoading: boolean;
}

const initialState: ICharacters = {
  characters: [],
  isLoading: false
};

export default (state = initialState, action: SetCharactersType) => {
  switch (action.type) {
    case SET_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.characters
      };
    case SET_CHARACTERS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
