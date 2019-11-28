import React from 'react';
import { Table } from 'reactstrap';

interface IProps {
  tHeaders: {
    name: string;
    sort?: (isAsc: boolean) => React.MouseEventHandler<HTMLElement>;
    isSortable: boolean;
    isAsc: boolean;
  }[];
  tData: {}[];
}

interface IRowProps {
  items: {};
}

const TableRow: React.FC<IRowProps> = (props: IRowProps) => {
  const { items } = props;

  const rowsValues: Array<string> = Object.values(items);

  return (
    <React.Fragment>
      <tr>
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
      <Table>
        <thead>
          <tr>
            {props.tHeaders.map((tHeader, index) => (
              <th key={index}>
                {tHeader.name}{' '}
                {tHeader.isSortable ? (
                  <i
                    className="fas fa-sort"
                    onClick={
                      tHeader.sort ? tHeader.sort(tHeader.isAsc) : undefined
                    }
                  ></i>
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tData.map((item, index) => (
            <TableRow items={item} />
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default TableWrapper;