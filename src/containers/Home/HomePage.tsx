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
    orderName: 'asc',
    orderHeight: 'asc',
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
    if (value === 'name') {
      setSortTable({ ...sortTable, name: value, height: '' });
    } else if (value === 'height') {
      setSortTable({ ...sortTable, name: '', height: value });
    }
  };

  const handleDBClickSort = (value: string): void => {
    if (value === 'name') {
      setSortTable({
        ...sortTable,
        orderName: sortTable.orderName === 'asc' ? 'desc' : 'asc',
        name: value,
        height: ''
      });
    } else if (value === 'height') {
      setSortTable({
        ...sortTable,
        orderHeight: sortTable.orderHeight === 'asc' ? 'desc' : 'asc',
        name: '',
        height: value
      });
    }
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

  // if (sortTable.height !== "") {
  //   filteredCharacters.sort((a, b) => b.height - a.height);
  // }

  // if (sortTable.name !== "") {
  //   filteredCharacters.sort((a, b) => {
  //     const nameA = a.name.toUpperCase();
  //     const nameB = b.name.toUpperCase();

  //     let comparison = 0;
  //     if (nameA > nameB) {
  //       comparison = 1;
  //     } else if (nameA < nameB) {
  //       comparison = -1;
  //     }
  //     return comparison;
  //   });
  // }

  function compareValues(key: string, order = 'asc') {
    return function innerSort(a: any, b: any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  const order = sortTable.name ? sortTable.orderName : sortTable.orderHeight;

  filteredCharacters.sort(
    compareValues(sortTable.height || sortTable.name, order)
  );

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
          handleDBClickSort={handleDBClickSort}
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
