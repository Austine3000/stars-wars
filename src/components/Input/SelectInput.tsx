import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  padding: 10px 100px 10px 10px;
  border-radius: 0px;
  font-weight: 600;
  background-color: #fff;
`;

interface IProps {
  onchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: { value: string; name: string }[];
  name: string;
}

const SelectInput: React.FC<IProps> = (props: IProps) => {
  return (
    <React.Fragment>
      <Select value={props.value} onChange={props.onchange}>
        <option value="">-- Please choose {props.name} --</option>
        {props.options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.name}
          </option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default SelectInput;
