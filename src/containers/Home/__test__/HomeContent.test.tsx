import React from 'react';
import { render, cleanup } from '@testing-library/react';
import HomeContent from '../HomeContent';

beforeEach(cleanup);

describe('<HomeContent>', () => {
  const characters = [{}];
  const isCLoading = true;
  const movieChoice = '';
  const options = [{ name: '', value: '' }];
  const credits = '';
  const handleMovieChange = jest.fn();
  const isMLoading = true;
  const renderComponent = () => {
    return render(
      <HomeContent
        characters={characters}
        isCLoading={isCLoading}
        movieChoice={movieChoice}
        options={options}
        credits={credits}
        handleMovieChange={handleMovieChange}
        isMLoading={isMLoading}
      />
    );
  };

  test('Checks if the page page is mounted', () => {
    renderComponent();
  });
});
