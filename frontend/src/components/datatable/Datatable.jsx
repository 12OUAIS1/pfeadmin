import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./datatable.scss";
import { Link } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: () => {
      return (
        <div className="cellaction">
          <div className="viewbtn">
            <Link to="/view" style={{ textDecoration: "none" }}>  <span>view</span></Link>
          </div>
          <div className="deletebtn"><Link to="/delete" style={{ textDecoration: "none" }}>  <span>delete</span></Link></div>
        </div>
      )
    }
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'hhh', firstName: 'Jon', age: 35 },
  { id: 7, lastName: 'h1', firstName: 'Cersei', age: 42 },
  { id: 8, lastName: 'h2', firstName: 'Jaime', age: 45 },
  { id: 9, lastName: 'h3', firstName: 'Arya', age: 16 },
  { id: 10, lastName: 'h4', firstName: 'Daenerys', age: null },
];

export default function DataTable() {
  return (
    <div className='app dark'>
      <div style={{ height: 600, width: '100%' }}>
        <Link to="/new" style={{ textDecoration: "none" }}>  <button id="btn">Button</button></Link>
        <DataGrid
          className='datagrid'
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[5, 9]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
