import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Person2Icon from '@mui/icons-material/Person2';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { authActions } from '../../store';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [adminrank, setAdminrank] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/v5/admin/${sessionStorage.getItem('id')}`);
        console.log('User data response:', response.data.rank);
        setAdminrank(response.data.rank);
        
        // Dispatch action to update user role in Redux state
        dispatch({ type: 'SET_USER_ROLE', payload: response.data.rank });
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserRole();
    }
  }, [isLoggedIn, dispatch]);

  console.log('Is logged in:', isLoggedIn);

  return (
    <div className='sidebar'>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MobilisAdmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">main</p>
          <li><DashboardIcon className='icons' /><span>dash</span></li>
          <p className="title">lists</p>

          <Link to="/list" style={{ textDecoration: "none" }}>
            <li><GroupIcon className='icons' /><span>users</span></li>
          </Link>

          <Link to="/reclam" style={{ textDecoration: "none" }}>
            <li><GppMaybeIcon className='icons' /><span>reclamation</span></li>
          </Link>

          <Link to="/post" style={{ textDecoration: "none" }}>
            <li><NewspaperIcon className='icons' /><span>posts</span></li>
          </Link>

          <Link to="/stats" style={{ textDecoration: "none" }}>
            <li><QueryStatsIcon className='icons' /><span>stats</span></li>
          </Link>

          <p className="title">admin</p>

          <li><NotificationsIcon className='icons' /><span>notification</span></li>

          {adminrank === 'adminsup' && (
            <Link to="/adata" style={{ textDecoration: "none" }}>
              <li><AdminPanelSettingsIcon className='icons' /><span>admin</span></li>
            </Link>
          )}

          <li><SettingsIcon className='icons' /><span>settings</span></li>

          <Link to="/singleadmin" style={{ textDecoration: "none" }}>
            <li><Person2Icon className='icons' /><span>profile</span></li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
