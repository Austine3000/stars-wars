import React from 'react';
import './TableWrapper.scss';

interface IProps {
  tHeaders: {
    name: string;

    isSortable: boolean;
  }[];
  tData: any[];
  numberOfCharacters: number;
  handleDBClickSort: (name: string) => void;
  height: number;
}

interface IRowProps {
  items: {};
  index: number;
}

const tofeet = (n: number) => {
  var realFeet = (n * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return '(' + feet + 'ft/' + inches + 'in)';
};

const TableRow: React.FC<IRowProps> = (props: IRowProps) => {
  const { items, index } = props;

  const rowsValues: Array<string> = Object.values(items);

  return (
    <React.Fragment>
      <tr>
        <td>{index + 1}</td>

        {rowsValues.map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    </React.Fragment>
  );
};

const TableWrapper: React.FC<IProps> = (props: IProps) => {
  return (
    <React.Fragment>
      <table className="table table-bordered">
        <thead>
          <tr>
            {props.tHeaders.length > 0 ? <th>S/N</th> : ''}
            {props.tHeaders.map((tHeader, index) => (
              <th
                key={index}
                className="capitalize sort-icon"
                onClick={() => props.handleDBClickSort(tHeader.name)}
              >
                {tHeader.name}{' '}
                {tHeader.isSortable ? <i className="fas fa-sort"></i> : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body-scroll">
          {props.tData.map((item, index) => (
            <TableRow key={index} items={item} index={index} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{props.numberOfCharacters}</th>
            <th></th>
            <th>{`${props.height}cm ${tofeet(props.height)}`}</th>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export default TableWrapper;
