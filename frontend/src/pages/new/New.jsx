import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const New = () => {
  const [userData, setUserData] = useState({
    email: '',
    number: '',
    numberu: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/v1/signup', userData);
      const createdUser = response.data.user;
      toast.success("User created successfully");
      const userId = sessionStorage.setItem("id", createdUser._id);
    } catch (error) {
      console.error('Error creating user:', error.response.data);
      toast.error("Failed to create user");
    }
  };

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newcontainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Admin</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <h1>New User</h1>
            <form onSubmit={handleSubmitUser} className="user-form">
              <div className="forminput">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="number">Phone</label>
                <input type="text" id="number" name="number" value={userData.number} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="numberu">Password</label>
                <input type="password" id="numberu" name="numberu" value={userData.numberu} onChange={handleChange} required />
              </div>
              <button type="submit" className="submit-button">Create User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
