import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Store } from '../../../store/configureStore';
import HomePage from '../HomePage';

beforeEach(cleanup);

const value = {
  dispatch: jest.fn(),
  movies: {
    movies: [{}],
    characters: [],
    gender: [],
    isCharacterLoading: false,
    isMovieLoading: false,
    error: ''
  }
};

const renderComponent = () => {
  return render(
    <Store.Provider value={value}>
      <HomePage />
    </Store.Provider>
  );
};

describe('<HomePage>', () => {
  test('Checks if the page page is mounted', () => {
    renderComponent();
  });
});
