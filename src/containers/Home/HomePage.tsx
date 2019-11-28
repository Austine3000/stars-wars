import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchCharacters } from './redux/actions';
import { rootState } from '../../store/reducers';

const HomeContent = React.lazy(() => import('./HomeContent'));

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

interface Imovie {
  title: string;
  episode_id: Number;
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const { characters, movies, isMLoading, isCLoading } = useSelector(
    (state: rootState) => state.homeReducer
  );

  const [movieChoice, setMovieChoice] = useState('');
  const [credits, setCredits] = useState('');

  const handleMovieChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setMovieChoice(value);
    if (value !== '0') {
      dispatch(fetchCharacters(value));
      let credits = movies.find(item => {
        return item.episode_id === Number(value);
      });

      setCredits(credits.opening_crawl);
    } else {
      setCredits('');
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

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <HomeContent
          characters={characters}
          isCLoading={isCLoading}
          movieChoice={movieChoice}
          options={options}
          credits={credits}
          handleMovieChange={handleMovieChange}
          isMLoading={isMLoading}
        />
      </React.Suspense>
    </React.Fragment>
  );
};

export default React.memo(HomePage);
