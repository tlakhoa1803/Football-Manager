// src/components/DataTable.js
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './Rank.css'; // Import your CSS file

const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} className="table-rank-league">
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table-header-cell">
              {column.render('Header')}
              <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()} className="table-body">
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} className="table-row">
            {row.cells.map(cell => (
              <td {...cell.getCellProps()} className="table-cell">
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default DataTable;