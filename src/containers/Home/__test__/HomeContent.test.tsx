import React from 'react';
import { render, cleanup } from '@testing-library/react';
import HomeContent from '../HomeContent';

beforeEach(cleanup);

describe('<HomeContent>', () => {
  const filteredCharacters = [{}];
  const isCLoading = true;
  const movieChoice = '';
  const options = [{ name: '', value: '' }];
  const credits = '';
  const handleMovieChange = jest.fn();
  const handleDBClickSort = jest.fn();
  const gender = [{}];
  const genderChoice = '';
  const handleGenderChange = jest.fn();

  const isMLoading = true;
  const renderComponent = () => {
    return render(
      <HomeContent
        characters={filteredCharacters}
        isCLoading={isCLoading}
        movieChoice={movieChoice}
        options={options}
        credits={credits}
        handleMovieChange={handleMovieChange}
        handleDBClickSort={handleDBClickSort}
        isMLoading={isMLoading}
        gender={gender}
        genderChoice={genderChoice}
        handleGenderChange={handleGenderChange}
      />
    );
  };

  test('Checks if the page page is mounted', () => {
    renderComponent();
  });
});
