import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import './singleadmin.scss'; 

const Single = () => {
  const [adminData, setAdminData] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({
    email: '',
    nom_complet: '',
    phone: '',
    address: '',
    photo: null
  });
  const [editingAdmin, setEditingAdmin] = useState(null); 

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
       
        const adminResponse = await axios.get(`http://localhost:2000/api/v5/admin/${sessionStorage.getItem('id')}`);
        setAdminData(adminResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []); 

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editingAdmin) {
        console.error('No admin data to update');
        return;
      }
      
      
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('nom_complet', formData.nom_complet);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('photo', formData.photo);

   
      const response = await axios.put(`http://localhost:2000/api/v5/updateadmin/${editingAdmin._id}`, formDataToSend);
      console.log('Server response:', response.data); 
      const updatedAdminResponse = await axios.get(`http://localhost:2000/api/v5/admin/${sessionStorage.getItem('id')}`);
      setAdminData(updatedAdminResponse.data);
      
      setEditMode(false);
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={toggleEditMode}>
              {editMode ? 'Cancel' : 'Edit'}
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                {adminData && (
                  <>
                    {!editMode ? (
                      <div className="admin-details">
                        <h2>Admin Information</h2>
                        <div className="admin-data">
                          <div>
                            <p>Name: {adminData.nom_complet}</p>
                            <p>Email: {adminData.email}</p>
                            <p>Phone: {adminData.phone}</p>
                            <p>Address: {adminData.address}</p>
                            <p>Badge Number: {adminData.badgeNumber}</p>
                            <p>ID Number: {adminData.idNumber}</p>
                          </div>
                          <div className="photo">
                            <img src={adminData.imgUrl} alt="Admin" style={{ width: '100px', height: '100px' }}/>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <h2>Edit Admin Information</h2>
                        <div>
                          <label htmlFor="email">Email:</label>
                          <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label htmlFor="nom_complet">Name:</label>
                          <input type="text" id="nom_complet" name="nom_complet" value={formData.nom_complet} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label htmlFor="phone">Phone:</label>
                          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label htmlFor="address">Address:</label>
                          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label htmlFor="photo">Photo:</label>
                          <input type="file" id="photo" name="photo" onChange={handleFileChange} />
                        </div>
                        <button type="submit">Save</button>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
