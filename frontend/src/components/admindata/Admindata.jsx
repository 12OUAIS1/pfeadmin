// Admindata.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const columns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {
    field: 'imgUrl',
    headerName: 'Image',
    width: 200,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Avatar"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    ),
  },
  { field: 'nom_complet', headerName: 'Full Name', width: 100 },
  { field: 'rank', headerName: 'Rank', width: 100 },
  { field: 'badgeNumber', headerName: 'Badge Number', width: 100 },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      const [isDeleting, setIsDeleting] = useState(false);

      const handleDeleteClick = async () => {
        setIsDeleting(true);
        if (window.confirm('Are you sure you want to delete this admin?')) {
          try {
            const response = await axios.delete(`http://localhost:2000/api/v5/deleteadmin/${params.row._id}`);
            console.log(response.data.message);
            // Update state after deletion
            setIsDeleting(false);
            toast.success('Admin deleted successfully');
            // Refresh the page after deletion
            window.location.reload();
          } catch (error) {
            console.error('Failed to delete admin:', error);
            toast.error('Failed to delete admin');
            setIsDeleting(false);
          }
        } else {
          setIsDeleting(false);
        }
      };

      return (
        <div className="cellaction">
       
          <div className="deletebtn">
            <button
              onClick={handleDeleteClick}
              style={{
                textDecoration: 'none',
                backgroundColor: isDeleting ? '#ff6666' : '#ff4d4d',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
                
              }}
            >
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          </div>
        </div>
      );
    },
  },
];

export default function Admindata() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v5/admin');
        const { users } = response.data;
        setAdmins(users);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="app">
      <div style={{ height: 600, width: '100%' }}>
        <Link to="/newadmin" style={{ textDecoration: 'none' }}>
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
            Add New Admin
          </button>
        </Link>
        <DataGrid
          className="datagrid"
          rows={admins.map((admin) => ({ ...admin, id: admin._id }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
}
