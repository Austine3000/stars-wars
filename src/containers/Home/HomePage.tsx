import React, { useEffect, useState } from 'react';
import { Store } from '../../store/configureStore';
import { fetchMovies, fetchCharacters } from './actions';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinners/Spinner';
import CompareMethod from '../../Helpers/CompareMethod';

import HomeContent from './HomeContent';

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

interface IState {
  characters: any[];
  movies: any[];
  isCharacterLoading: boolean;
  isMovieLoading: boolean;
  gender: any[];
  error: string;
}

const HomePage: React.FC = () => {
  const { movies, dispatch } = React.useContext(Store);

  const state: IState = {
    characters: movies.characters,
    movies: movies.movies,
    isCharacterLoading: movies.isCharacterLoading,
    isMovieLoading: movies.isMovieLoading,
    gender: movies.gender,
    error: movies.error
  };

  const [movieChoice, setMovieChoice] = useState('');
  const [credits, setCredits] = useState('');
  const [genderChoice, setGender] = useState('');
  const [sortTable, setSortTable] = useState({
    order: 'asc',
    sortName: ''
  });

  useEffect(() => {
    fetchMovies(dispatch);
  }, [dispatch]);

  const handleMovieChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setMovieChoice(value);
    if (value !== '') {
      setGender('');
      const movie = state.movies.find(item => {
        return item.episode_id === Number(value);
      });

      fetchCharacters(dispatch, movie);

      setCredits(movie.opening_crawl);
    } else {
      setCredits('');
    }
  };

  const handleGenderChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setGender(value);
  };

  const handleDBClickSort = (value: string): void => {
    setSortTable({
      ...sortTable,
      sortName: value,
      order: sortTable.order === 'asc' ? 'desc' : 'asc'
    });
  };

  const options = state.movies.map(movie => {
    var items = {
      name: movie.title,
      value: String(movie.episode_id)
    };
    return items;
  });

  if (state.error !== '') {
    toast.error(state.error);
  }

  let filteredCharacters;
  if (genderChoice !== '') {
    filteredCharacters = state.characters.filter(element => {
      return element.gender === genderChoice;
    });
  } else {
    filteredCharacters = [...state.characters];
  }

  filteredCharacters.sort(CompareMethod(sortTable.sortName, sortTable.order));

  return (
    <React.Fragment>
      <React.Suspense fallback={<Spinner />}>
        <HomeContent
          characters={filteredCharacters}
          isCharacterLoading={state.isCharacterLoading}
          movieChoice={movieChoice}
          options={options}
          credits={credits}
          sortName={sortTable.sortName}
          sortorder={sortTable.order}
          handleMovieChange={handleMovieChange}
          handleDBClickSort={handleDBClickSort}
          isMovieLoading={state.isMovieLoading}
          gender={state.gender}
          genderChoice={genderChoice}
          handleGenderChange={handleGenderChange}
        />
      </React.Suspense>
    </React.Fragment>
  );
};

export default React.memo(HomePage);
