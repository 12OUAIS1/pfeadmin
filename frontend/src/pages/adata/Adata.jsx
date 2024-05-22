import React from 'react'
import "./adata.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Datatable from '../../components/datatable/Datatable'
import Admindata from '../../components/admindata/Admindata'
const Adata = () => {
  return (
    <div className='adata'>
      <Sidebar/>
      <div className="listcontainer">
        <Navbar/>
        <Admindata/>
      </div>
    </div>
  )
}

export default Adata
