import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useDispatch } from 'react-redux'; 
import { authActions } from '../../store';
import "./login.scss"

const Login = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); 

    if (!inputs.email || !inputs.password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/api/v5/admin/login", inputs);
      const { message, admin } = response.data;
      console.log(admin)
      sessionStorage.setItem("id", admin._id);
      dispatch(authActions.login());
      navigate("/home");
      toast.success(message);
    } catch (error) {
      console.error("Error during login:", error);
      toast.error('Please make sure you have entered your information correctly');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
       
        <div className="input-container">
          <input type="email" name="email" placeholder="Enter email" onChange={handleChange} value={inputs.email} required/>
        </div>
        <div className="input-container">
          <input type="password" name="password" placeholder="Enter password" onChange={handleChange} value={inputs.password} required />
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>
        <p className="signup-link">
          No account?
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
