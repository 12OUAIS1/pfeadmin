import React, { useState } from 'react';
import "./newadmin.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Newadmin = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        // Access the first file from the array of selected files
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className='newadmin'>
            <Sidebar />
            <div className="newadmincontainer">
                <Navbar />
                <div className="top">
                    <h1>add new admin</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form action="">
                            <div className="forminput">
                                <label htmlFor="file"><NoteAddIcon className='icon' /></label>
                                <input type="file" id='file' onChange={handleFileChange} />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder='John' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Last Name</label>
                                <input type="text" placeholder='Doe' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Email</label>
                                <input type="text" placeholder='john@example.com' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Phone</label>
                                <input type="text" placeholder='123-456-7890' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Password</label>
                                <input type="password" placeholder='********' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Address</label>
                                <input type="text" placeholder='123 Main St, City' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">ID Number</label>
                                <input type="text" placeholder='ID123456' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Rank</label>
                                <input type="text" placeholder='Admin' />
                            </div>
                            <div className="forminput">
                                <label htmlFor="">Badge Number</label>
                                <input type="text" placeholder='123' />
                            </div>
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newadmin;
