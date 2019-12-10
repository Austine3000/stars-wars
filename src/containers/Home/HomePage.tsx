import React, { useCallback, useEffect, useState } from 'react';
import { Store } from '../../store/configureStore';
import { fetchMovies, fetchCharacters } from './redux/actions';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinners/Spinner';
import CompareMethod from '../../Helpers/CompareMethod';

const HomeContent = React.lazy(() => import('./HomeContent'));

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;
type MouseEvent = React.MouseEventHandler<HTMLElement>;

interface Imovie {
  title: string;
  episode_id: Number;
}

interface IState {
  characters: any[];
  movies: any[];
  isCLoading: boolean;
  isMLoading: boolean;
  gender: any[];
  error: string;
}

const HomePage: React.FC = () => {
  const { movies, dispatch } = React.useContext(Store);

  const state: IState = {
    characters: movies.characters,
    movies: movies.movies,
    isCLoading: movies.isCLoading,
    isMLoading: movies.isMLoading,
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

  const handleMovieChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setMovieChoice(value);
    if (value !== '') {
      fetchCharacters(dispatch, value, state.movies);
      let credits = state.movies.find(item => {
        return item.episode_id === Number(value);
      });

      setCredits(credits.opening_crawl);
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

  const getAllMovies = useCallback(() => {
    fetchMovies(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

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
    filteredCharacters = state.characters;
  }

  filteredCharacters.sort(CompareMethod(sortTable.sortName, sortTable.order));

  return (
    <React.Fragment>
      <React.Suspense fallback={<Spinner />}>
        <HomeContent
          characters={filteredCharacters}
          isCLoading={state.isCLoading}
          movieChoice={movieChoice}
          options={options}
          credits={credits}
          sortName={sortTable.sortName}
          sortorder={sortTable.order}
          handleMovieChange={handleMovieChange}
          handleDBClickSort={handleDBClickSort}
          isMLoading={state.isMLoading}
          gender={state.gender}
          genderChoice={genderChoice}
          handleGenderChange={handleGenderChange}
        />
      </React.Suspense>
    </React.Fragment>
  );
};

export default React.memo(HomePage);
