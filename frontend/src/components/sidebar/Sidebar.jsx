import React from 'react'
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='sidebar'>
     <div className="top">
        <Link to="/" style={{textDecoration:"none"}}><span className="logo">MobilisAdmin</span></Link>
     </div>
     <hr />
     <div className="center">
     <ul>
      <p className="title">main</p>
        <li> <DashboardIcon className='icons'/><span>dash</span></li>
        <p className="title">lists</p>
        
        <Link to="/list" style={{textDecoration:"none"}}><span className="logo"><li> <GroupIcon className='icons'/><span>users</span></li></span></Link>
        <li><GppMaybeIcon className='icons'/> <span>relamation</span></li>
        <li><SettingsSystemDaydreamIcon className='icons'/> <span>system health</span></li>
        <li> <NewspaperIcon className='icons'/><span>posts</span></li>
        <li> <QueryStatsIcon className='icons'/><span>stats</span></li>
        <p className="title">admin</p>
        <li> <NotificationsIcon className='icons'/><span>notification</span></li>
        <li><AdminPanelSettingsIcon className='icons'/> <span>admin</span></li>
        <li><SettingsIcon className='icons'/> <span>settings</span></li>
        <li><Person2Icon className='icons'/> <span>profile</span></li>
        <li> <LogoutIcon className='icons'/><span>log out</span></li>
     </ul>
     </div>
     <div className="bottom">
      <div className="coloropt"><ModeNightIcon className='opt'/></div>
      <div className="coloropt"><WbSunnyIcon className='opt1'/></div>
     </div>
    </div>
  )
}

export default Sidebar
