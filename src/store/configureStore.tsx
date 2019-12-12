import React from 'react';

import Movie, { IMovies } from '../containers/Home/reducer';

interface IContextProps {
  movies: IMovies;
  dispatch: ({ type }: { type: string }) => void;
}

export const Store = React.createContext({} as IContextProps);

export function StoreProvider(props: any) {
  const [movies, dispatch] = React.useReducer(
    Movie.HomeReducer,
    Movie.initialState
  );

  const value = { movies, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
