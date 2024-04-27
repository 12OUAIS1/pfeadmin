import React from 'react'
import "./new.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
const New = () => {
  return (
    <div className='new'>
      <Sidebar/>
      <div className="newcontainer">
        <Navbar/>
        <div className="top">
          <h1>add new admin</h1>
        </div>
        <div className="bottom">
        <div className="left">
          <h1>new user</h1>
        </div>
        <div className="right">
          <form action="">
            <div className="forminput">
              <label htmlFor="">name</label>
              <input type="text" placeholder='john' /> 
              </div>  
              <div className="forminput">
              <label htmlFor="">lastname</label>
              <input type="text" placeholder='doe' /> 
              </div>     
              <div className="forminput">
              <label htmlFor="">email</label>
              <input type="text" placeholder='john' /> 
              </div>
              <div className="forminput">
              <label htmlFor="">phone</label>
              <input type="text" placeholder='john' /> 
              </div>
              <div className="forminput">
              <label htmlFor="">password</label>
              <input type="text" placeholder='john' /> 
              </div>
              <div className="forminput">
              <label htmlFor="">adress</label>
              <input type="text" placeholder='john' /> 
              </div>
            
                 
              <button>send</button>           
               </form>
        </div>
        </div>
        </div>    
        </div>
  )
}

export default New
