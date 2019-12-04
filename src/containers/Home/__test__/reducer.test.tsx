import { HomeReducer } from '../redux/reducer';
import * as types from '../redux/types';

describe('Home reducer', () => {
  it('shoudld return the movies success', () => {
    expect(
      HomeReducer(
        {
          characters: [],
          movies: [],
          gender: [],
          isCLoading: false,
          isMLoading: false,
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
      isCLoading: false,
      isMLoading: false,
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
          isCLoading: false,
          isMLoading: false,
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
      isCLoading: false,
      isMLoading: false,
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
          isCLoading: false,
          isMLoading: false,
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
      isCLoading: false,
      isMLoading: true,
      error: ''
    });
  });

  it('shoudld return the characters loading', () => {
    expect(
      HomeReducer(
        { isCLoading: false },
        {
          type: types.SET_CHARACTERS_LOADING,
          isLoading: true
        }
      )
    ).toEqual({
      isCLoading: true
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
