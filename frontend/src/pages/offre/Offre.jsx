import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './offre.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const New = () => {
  const [offreData, setOffreData] = useState({
    namee: '',
    numberr: '',
    creadit: '',
    offre: '',
    net: '',
    days: '',
    id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffreData(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmitOffre = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Offre:", offreData);
      const response = await axios.post('http://localhost:2000/api/v3/offre', {
        ...offreData,
       
      });
      console.log("Response from server:", response.data);
      const createdOffre = response.data.offre;
      toast.success("Offre created successfully");
    } catch (error) {
      console.error('Error creating offre:', error);
      toast.error("Failed to create offre");
    }
  };

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newcontainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Offre</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <h1>New Offre</h1>
            <form onSubmit={handleSubmitOffre} className="offre-form">
              <div className="forminput">
                <label htmlFor="namee">Name</label>
                <input type="text" id="namee" name="namee" value={offreData.namee} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="numberr">Phone Number</label>
                <input type="text" id="numberr" name="numberr" value={offreData.numberr} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="creadit">Credit</label>
                <input type="number" id="creadit" name="creadit" value={offreData.creadit} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="offre">Offre</label>
                <input type="text" id="offre" name="offre" value={offreData.offre} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="net">Net</label>
                <input type="number" id="net" name="net" value={offreData.net} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="days">Days</label>
                <input type="date" id="days" name="days" value={offreData.days} onChange={handleChange} required />
              </div>
              <div className="forminput">
                <label htmlFor="id">User ID</label>
                <input type="text" id="id" name="id" value={offreData.id} onChange={handleChange} required />
              </div>
              <button type="submit" className="submit-button">Create Offre</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
