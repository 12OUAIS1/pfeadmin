import React, { useEffect, useState } from 'react';
import "./newadmin.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const Newadmin = () => {
    const [file, setFile] = useState(null);
    const [imgperc, setImageperc] = useState(0);
    const [inputs, setInputs] = useState({
        imgUrl: '' // Initialize imgUrl as an empty string
    });

    useEffect(() => {
        if (file) {
            uploadFile(file);
        }
    }, [file]);

    const uploadFile = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageperc(Math.round(progress));
                },
                (error) => {
                    console.log("Upload Error:", error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setInputs((prev) => ({
                            ...prev,
                            imgUrl: downloadURL
                        }));
                    } catch (error) {
                        console.log("Download URL Error:", error);
                    }
                }
            );
        } catch (error) {
            console.log("Storage Error:", error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Inputs:", inputs);
            if (inputs.imgUrl.trim() !== '') {
                await axios.post("http://localhost:2000/api/v6/image", { imgUrl: inputs.imgUrl }); // Send imgUrl in the request body
            } else {
                console.error('Invalid imgUrl:', inputs.imgUrl);
            }
        } catch (error) {
            console.log("Submit Error:", error);
        }
    };
    

    return (
        <div className='newadmin'>
            <Sidebar />
            <div className="newadmincontainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Admin</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="forminput">
                                <label htmlFor="file"><NoteAddIcon className='icon' /></label>
                                <input type="file" id='file' accept='image/*' onChange={handleFileChange} />
                                <label htmlFor="file">Image:</label> {imgperc > 0 && `Uploading ${imgperc}%`}
                            </div>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newadmin;
