import React from 'react'
import "./home.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'

const Home = () => {
  return (
    <div className="home">
   <Sidebar/>
   <div className="homeContainer">
    <Navbar/>
    <div className="widgets">
    <Widgets type="user"/>
<Widgets type="reclamation"/>
<Widgets type="earnings"/>
<Widgets type="balance"/>
    </div>
   </div>
    </div>
  )
}

export default Home
