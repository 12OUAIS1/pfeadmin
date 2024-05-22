import React, { useEffect, useState } from 'react';
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '../../store';
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
  const dispatch = useDispatch();
  const [adminPhoto, setAdminPhoto] = useState(null);
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  
  useEffect(() => {
    const fetchAdminPhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/v5/admin/${sessionStorage.getItem('id')}`);
        setAdminPhoto(response.data.imgUrl);
      } catch (error) {
        console.error('Failed to fetch admin photo:', error);
      }
    };

    if (isLoggedIn) {
      fetchAdminPhoto();
    }
  }, [isLoggedIn]);

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='search' />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeIcon className='icon' />
          </div>
          <div className="item">
            <FullscreenExitIcon className='icon' />
          </div>
          <div className="item">
            <NotificationsIcon className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleIcon className='icon' />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <FormatListBulletedIcon className='icon' />
          </div>
    
          {isLoggedIn && (
            <> 
             {adminPhoto && (
                <div className="admin-photo">
                  <img src={adminPhoto} alt="Admin" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                </div>
              )}
              <div className="item" onClick={logout}>
                <Link to="/"><RiLogoutBoxFill className="icon" /></Link>
              </div>
             
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
