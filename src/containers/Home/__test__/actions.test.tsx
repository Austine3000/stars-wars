import * as actions from '../redux/actions';
import * as types from '../redux/types';

jest.mock('../../../utils/AxiosWrapper', () => ({
  get: jest.fn(url => {
    let result;
    if (url === '/films/') {
      result = {
        data: {
          results: [
            {
              name: 'Last Jedi'
            }
          ]
        }
      };
    } else if (url === '/people/2') {
      result = {
        data: {
          name: 'John',
          gender: 'male',
          height: 250
        }
      };
    }
    return result;
  })
}));

const dispatch = jest.fn();

describe('Home actions', () => {
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
    const gender = [''];

    const expectedAction = {
      type: types.SET_CHARACTERS_SUCCESS,
      characters,
      gender
    };

    expect(actions.fetchCharactersSuccess(characters, gender)).toEqual(
      expectedAction
    );
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
    const expectedActions = 'Last Jedi';
    const movies = await actions.fetchMovies(dispatch);
    expect(movies.data.results[0].name).toBe(expectedActions);

    done();
  });

  it('creates SET_CHARACTER_SUCCESS when fetching characters has been done', async done => {
    const expectedActions = {
      name: 'John',
      gender: 'M',
      height: 250
    };

    const id = '2';

    const moviesItems = [{ episode_id: 2, characters: ['/people/2'] }];
    const characters = await actions.fetchCharacters(dispatch, id, moviesItems);
    expect(characters[0]).toEqual(expectedActions);

    done();
  });
});
