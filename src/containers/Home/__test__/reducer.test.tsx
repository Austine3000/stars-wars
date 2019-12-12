import { HomeReducer } from '../reducer';
import * as types from '../types';

describe('Home reducer', () => {
  it('shoudld return the movies success', () => {
    expect(
      HomeReducer(
        {
          characters: [],
          movies: [],
          gender: [],
          isCharacterLoading: false,
          isMovieLoading: false,
          error: ''
        },
        {
          type: types.SET_MOVIES_SUCCESS,
          movies: [
            {
              name: 'The return of jedi'
            }
          ]
        }
      )
    ).toEqual({
      characters: [],

      gender: [],
      isCharacterLoading: false,
      isMovieLoading: false,
      error: '',
      movies: [
        {
          name: 'The return of jedi'
        }
      ]
    });
  });

  it('shoudld return the character success', () => {
    expect(
      HomeReducer(
        {
          characters: [],
          movies: [],
          gender: [],
          isCharacterLoading: false,
          isMovieLoading: false,
          error: ''
        },
        {
          type: types.SET_CHARACTERS_SUCCESS,
          characters: [
            {
              name: 'Obi own'
            }
          ],
          gender: ['male']
        }
      )
    ).toEqual({
      movies: [],
      gender: ['male'],
      isCharacterLoading: false,
      isMovieLoading: false,
      error: '',
      characters: [
        {
          name: 'Obi own'
        }
      ]
    });
  });

  it('shoudld return the movies loading', () => {
    expect(
      HomeReducer(
        {
          characters: [],
          movies: [],
          gender: [],
          isCharacterLoading: false,
          isMovieLoading: false,
          error: ''
        },
        {
          type: types.SET_MOVIES_LOADING,
          isLoading: true
        }
      )
    ).toEqual({
      characters: [],
      movies: [],
      gender: [],
      isCharacterLoading: false,
      isMovieLoading: true,
      error: ''
    });
  });

  it('shoudld return the characters loading', () => {
    expect(
      HomeReducer(
        { isCharacterLoading: false },
        {
          type: types.SET_CHARACTERS_LOADING,
          isLoading: true
        }
      )
    ).toEqual({
      isCharacterLoading: true
    });
  });

  it('shoudld return the movies error', () => {
    expect(
      HomeReducer(
        { error: '' },
        {
          type: types.SET_MOVIES_ERROR,
          message: 'Their is an error'
        }
      )
    ).toEqual({
      error: 'Their is an error'
    });
  });

  it('shoudld return the character error', () => {
    expect(
      HomeReducer(
        { error: '' },
        {
          type: types.SET_CHARACTERS_ERROR,
          message: 'Their is an error'
        }
      )
    ).toEqual({
      error: 'Their is an error'
    });
  });
});
