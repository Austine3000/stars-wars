import React from 'react';
import TableWrapper from '../../components/TableWrapper/TableWrapper';
import SelectInput from '../../components/Input/SelectInput';
import Crawl from '../../components/Crawl/Crawl';

interface IProps {
  characters: any[];
  isCLoading: boolean;
  isMLoading: boolean;
  movieChoice: string;
  credits: string;
  options: { value: string; name: string }[];
  handleMovieChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const HomeContent: React.FC<IProps> = (props: IProps) => {
  const headers =
    props.characters.length > 0 ? Object.keys(props.characters[0]) : [];

  const tHeaders = headers.map(header => {
    let isSortable = false;
    if (header === 'name' || header === 'height') {
      isSortable = true;
    }
    return {
      name: header,
      isSortable: isSortable
    };
  });

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <h1>Home Content</h1>
        <SelectInput
          options={props.options}
          onchange={props.handleMovieChange}
          value={props.movieChoice}
        />
        <Crawl credits={props.credits} />
        <TableWrapper tHeaders={tHeaders} tData={props.characters} />
      </React.Suspense>
    </React.Fragment>
  );
};

export default React.memo(HomeContent);
