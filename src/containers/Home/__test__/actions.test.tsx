import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../redux/actions';
import * as types from '../redux/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Home actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should get all movies success', () => {
    const movies = [{}];

    const expectedAction = {
      type: types.SET_MOVIES_SUCCESS,
      movies
    };

    expect(actions.fetchMoviesSuccess(movies)).toEqual(expectedAction);
  });

  it('should get all movies failure', () => {
    const message = 'Failed to get message';

    const expectedAction = {
      type: types.SET_MOVIES_ERROR,
      message
    };

    expect(actions.fetchMoviesError(message)).toEqual(expectedAction);
  });

  it('should get all movies loading', () => {
    const isLoading = true;

    const expectedAction = {
      type: types.SET_MOVIES_LOADING,
      isLoading
    };

    expect(actions.fetchMoviesLoading(isLoading)).toEqual(expectedAction);
  });

  it('should get all characters success', () => {
    const characters = [{}];

    const expectedAction = {
      type: types.SET_CHARACTERS_SUCCESS,
      characters
    };

    expect(actions.fetchCharactersSuccess(characters)).toEqual(expectedAction);
  });

  it('should get all characters failure', () => {
    const message = 'Failed to get message';

    const expectedAction = {
      type: types.SET_CHARACTERS_ERROR,
      message
    };

    expect(actions.fetchCharactersError(message)).toEqual(expectedAction);
  });

  it('should get all characters loading', () => {
    const isLoading = true;

    const expectedAction = {
      type: types.SET_CHARACTERS_LOADING,
      isLoading
    };

    expect(actions.fetchCharactersLoading(isLoading)).toEqual(expectedAction);
  });

  it('creates SET_MOVIES_SUCCESS when fetching movies has been done', async done => {
    moxios.stubRequest('https://swapi.co/api/films/', {
      status: 200,
      response: {
        data: {
          results: [{}]
        }
      }
    });

    const expectedActions = [
      {
        type: types.SET_MOVIES_SUCCESS,
        movies: [{}]
      },
      {
        type: types.SET_MOVIES_LOADING,
        isLoading: true
      }
    ];

    const store = mockStore({
      homeReducer: {
        characters: [],
        movies: [],
        isCLoading: false,
        isMLoading: false,
        error: ''
      }
    });

    await store.dispatch(actions.fetchMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('creates SET_CHARACTER_SUCCESS when fetching characters has been done', async done => {
    moxios.stubRequest('https://swapi.co/api/people/2', {
      status: 200,
      response: {
        data: {
          results: [{}]
        }
      }
    });

    const expectedActions = [
      {
        type: types.SET_CHARACTERS_SUCCESS,
        characters: [{}]
      },
      {
        type: types.SET_CHARACTERS_LOADING,
        isLoading: false
      }
    ];

    const store = mockStore({
      homeReducer: {
        characters: [],
        movies: [{ episode_id: 2, characters: ['/people/2', '/people/3'] }],
        isCLoading: false,
        isMLoading: false,
        error: ''
      }
    });

    const id = '2';

    await store.dispatch(actions.fetchCharacters(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
