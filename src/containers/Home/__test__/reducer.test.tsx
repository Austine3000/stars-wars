import reducer from '../redux/reducer';
import * as types from '../redux/types';

describe('Home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      characters: [],
      movies: [],
      gender: [],
      isCLoading: false,
      isMLoading: false,
      error: ''
    });
  });

  it('shoudld return the movies success', () => {
    expect(
      reducer(
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
      reducer(
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
      reducer(
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
      reducer(
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
      reducer(
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
      reducer(
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
