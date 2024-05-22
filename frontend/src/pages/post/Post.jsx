import React from 'react';
import "./post.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Fepost from '../../components/posts/Fepost';

const List = () => {
  return (
    <div className='post'>
      <Sidebar />
      <div className="postcontainer">
        <Navbar />
        <Fepost  className="fposts"/>
      </div>
    </div>
  );
};

export default List;
