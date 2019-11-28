import React from 'react';

interface IProps {
  onchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: { value: string; name: string }[];
}

const SelectInput: React.FC<IProps> = (props: IProps) => {
  return (
    <React.Fragment>
      <select value={props.value} onChange={props.onchange}>
        <option value="0">--Please choose an option--</option>
        {props.options.map((option, index) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default SelectInput;
