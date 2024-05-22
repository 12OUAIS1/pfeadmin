// In your frontend code (UserReclamations.js)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './recalamation.scss';

const UserReclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [editingReclamation, setEditingReclamation] = useState(null);

  useEffect(() => {
    const fetchAllReclamations = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/v4/allreclamations`);
        const { reclamations, message } = response.data;
        if (reclamations && reclamations.length > 0) {
          setReclamations(reclamations);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error('Failed to fetch all reclamations:', error);
      }
    };

    fetchAllReclamations();
  }, []);

  const handleDelete = async (reclamationId) => {
    if (window.confirm('Are you sure you want to delete this reclamation?')) {
      try {
        const response = await axios.delete(`http://localhost:2000/api/v4/deleterec/${reclamationId}`);
        const { message } = response.data;
        setReclamations(reclamations.filter(reclamation => reclamation._id !== reclamationId));
        toast.success(message);
      } catch (error) {
        console.error('Failed to delete reclamation:', error);
        toast.error('Failed to delete reclamation');
      }
    } else {
      console.log('Deletion canceled');
    }
  };

  const handleEdit = (reclamation) => {
    setEditingReclamation(reclamation);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if state or response is empty
    if (!editingReclamation.state || !editingReclamation.response) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:2000/api/v4/updaterec/${editingReclamation._id}`, {
        state: editingReclamation.state,
        response: editingReclamation.response
      });
      const { reclamation } = response.data;
      setReclamations(reclamations.map(item => (item._id === reclamation._id ? reclamation : item)));
      toast.success('Reclamation updated successfully');
    } catch (error) {
      console.error('Failed to update reclamation:', error);
      toast.error('Failed to update reclamation');
    }
    setEditingReclamation(null);
  };

  const handleClose = () => {
    setEditingReclamation(null);
  };

  return (
    <div className='reclam'>
      <Sidebar />
      
      <div className="reclamcontainer">
        <Navbar />
        <h2>User Reclamations</h2>
        <div className="reclamation-cards">
          {reclamations.length > 0 ? (
            reclamations.map((reclamation) => (
              <div className="reclamation-card" key={reclamation._id}>
                {editingReclamation && editingReclamation._id === reclamation._id ? (
                  <div className="edit-form">
                    <h3>Edit Reclamation</h3>
                    <form onSubmit={handleFormSubmit}>
                      <label>
                        state
                        <input type="text" value={editingReclamation.state} onChange={(e) => setEditingReclamation({ ...editingReclamation, state: e.target.value })} />
                      </label>
                      <label>
                       response
                        <input type="text" value={editingReclamation.response} onChange={(e) => setEditingReclamation({ ...editingReclamation, response: e.target.value })} />
                      </label>
                      
                      <div className="reclamation-actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleClose} className="close-button"><AiOutlineClose /> Close</button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    <p>Reclamation ID: {reclamation._id}</p>
                    <p>Description: {reclamation.nomcomplet}</p>
                    <p>Number: {reclamation.numero}</p>
                    <p>Issue: {reclamation.issue}</p>
                    {reclamation.state && <p>State: {reclamation.state}</p>}
                    {reclamation.response && <p>Response: {reclamation.response}</p>}
                    <div className="reclamation-actions">
                      <button className="edit-button" onClick={() => handleEdit(reclamation)}><AiOutlineEdit /> Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(reclamation._id)}><AiOutlineDelete /> Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No reclamations found for this user</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserReclamations;
