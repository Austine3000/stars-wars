import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchCharacters } from './redux/actions';
import { rootState } from '../../store/reducers';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinners/Spinner';

const HomeContent = React.lazy(() => import('./HomeContent'));

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;
type MouseEvent = React.MouseEventHandler<HTMLElement>;

interface Imovie {
  title: string;
  episode_id: Number;
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const {
    characters,
    movies,
    isMLoading,
    isCLoading,
    error,
    gender
  } = useSelector((state: rootState) => state.homeReducer);

  const [movieChoice, setMovieChoice] = useState('');
  const [credits, setCredits] = useState('');
  const [genderChoice, setGender] = useState('');
  const [sortTable, setSortTable] = useState({
    name: '',
    height: ''
  });

  const handleMovieChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setMovieChoice(value);
    if (value !== '') {
      dispatch(fetchCharacters(value));
      let credits = movies.find(item => {
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

  const handleClickSort = (value: string): void => {
    setSortTable({ ...sortTable, [value]: value });
  };

  const getAllMovies = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  const options = movies.map(movie => {
    var items = {
      name: movie.title,
      value: String(movie.episode_id)
    };
    return items;
  });

  if (error !== '') {
    toast.error(error);
  }

  let filteredCharacters;
  if (genderChoice !== '') {
    filteredCharacters = characters.filter(element => {
      return element.gender === genderChoice;
    });
  } else {
    filteredCharacters = characters;
  }

  if (sortTable.height !== '') {
    filteredCharacters.sort((a, b) => b.height - a.height);
  }

  if (sortTable.name !== '') {
    filteredCharacters.sort();
  }

  return (
    <React.Fragment>
      <React.Suspense fallback={<Spinner />}>
        <HomeContent
          characters={filteredCharacters}
          isCLoading={isCLoading}
          movieChoice={movieChoice}
          options={options}
          credits={credits}
          handleMovieChange={handleMovieChange}
          isMLoading={isMLoading}
          gender={gender}
          genderChoice={genderChoice}
          handleGenderChange={handleGenderChange}
          handleClickSort={handleClickSort}
        />
      </React.Suspense>
    </React.Fragment>
  );
};

export default React.memo(HomePage);
