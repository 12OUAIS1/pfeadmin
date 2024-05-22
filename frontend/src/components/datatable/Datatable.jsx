import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'number', headerName: 'Number', width: 150 },
  { field: 'numberu', headerName: 'NumberU', width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
          await axios.delete(`http://localhost:2000/api/v1/deleteuser/${params.id}`);
          toast.success("User deleted successfully");
          window.location.reload(); // Refresh the page after deletion
        } catch (error) {
          console.error('Error deleting user:', error.response.data);
          toast.error("Failed to delete user");
        }
      };

      return (
        <button onClick={handleDelete} style={{ 
          textDecoration: 'none',
          backgroundColor: '#ff6666' ,
          color: 'white',
          padding: '5px 10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Delete</button>
      );
    }
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/v1/getusers');
      const userData = response.data.map(user => ({
        id: user._id,
        email: user.email,
        number: user.number,
        numberu: user.numberu,
      }));
      setRows(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className='app dark'>
      <div style={{ height: 600, width: '100%' }}>
     
      <Link to="/new" style={{ textDecoration: 'none' }}>
          <button
            id="btn"
            style={{
              backgroundColor: '#008CBA',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft:"10px",
              marginBottom: '10px'
            }}
          >
            Add New user
          </button>
        </Link>
        <Link to="/offre" style={{ textDecoration: 'none' }}>
          <button
            id="btn"
            style={{
              backgroundColor: '#008CBA',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft:"10px",
              marginBottom: '10px'
            }}
          >
           give offer
          </button>
        </Link>
        <DataGrid
          className='datagrid'
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
}
