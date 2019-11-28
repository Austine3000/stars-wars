import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HomePage from '../HomePage';

beforeEach(cleanup);

const mockStore = configureStore([thunk]);

describe('<HomePage>', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      homeReducer: {
        characters: [],
        movies: [],
        isCLoading: false,
        isMLoading: false,
        error: ''
      }
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  };

  test('Checks if the page page is mounted', () => {
    renderComponent();
  });
});
