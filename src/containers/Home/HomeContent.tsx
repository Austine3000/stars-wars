import React from 'react';
import TableWrapper from '../../components/TableWrapper/TableWrapper';
import SelectInput from '../../components/Input/SelectInput';
import Crawl from '../../components/Crawl/Crawl';
import Spinner from '../../components/Spinners/Spinner';
import { MainContent, LogoArea } from '../../components/Layout/MainContent';
import './Home.scss';

interface IProps {
  characters: any[];
  isCLoading: boolean;
  isMLoading: boolean;
  movieChoice: string;
  credits: string;
  options: { value: string; name: string }[];
  gender: any[];
  genderChoice: string;
  handleGenderChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMovieChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDBClickSort: (name: string) => void;
}

const HomeContent: React.FC<IProps> = (props: IProps) => {
  const headers =
    props.characters.length > 0 ? Object.keys(props.characters[0]) : [];

  const tHeaders = headers.map(header => {
    let isSortable = true;

    return {
      name: header,
      isSortable: isSortable
    };
  });

  let height = 0;
  let numberOfCharacters = 0;

  props.characters.forEach(element => {
    if (Number(element.height) >= 0) {
      height = height + Number(element.height);
    }
    numberOfCharacters = numberOfCharacters + 1;
  });

  return (
    <React.Fragment>
      <MainContent>
        <SelectInput
          options={props.options}
          name="movie"
          onchange={props.handleMovieChange}
          value={props.movieChoice}
        />
      </MainContent>
      {props.credits !== '' ? (
        <>
          <Crawl credits={props.credits} />
          {!props.isCLoading ? (
            <div className="table-area">
              <SelectInput
                options={props.gender}
                name="gender"
                onchange={props.handleGenderChange}
                value={props.genderChoice}
              />
              <TableWrapper
                tHeaders={tHeaders}
                tData={props.characters}
                handleDBClickSort={props.handleDBClickSort}
                height={height}
                numberOfCharacters={numberOfCharacters}
              />
            </div>
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <LogoArea>
          <img src="/assets/Star_Wars_Logo.svg.png" alt="star-wars-logo" />
        </LogoArea>
      )}
    </React.Fragment>
  );
};

export default React.memo(HomeContent);
