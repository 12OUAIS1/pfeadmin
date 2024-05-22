import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./newpost.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const NewPost = () => {
    const [file, setFile] = useState(null);
    const [imgperc, setImageperc] = useState(0);
    const [inputs, setInputs] = useState({
        imgUrl: '' // Initialize imgUrl as an empty string
    });
    const [data, setData] = useState({
        title: "",
        descreption: ""
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const formData = {
                imgUrl: inputs.imgUrl.trim(),
                title: data.title.trim(),
                descreption: data.descreption.trim()
            };

            // Validate imgUrl
            if (formData.imgUrl === '') {
                console.error('Invalid imgUrl:', formData.imgUrl); 
                return;
            }

           
            if (Object.values(formData).some(value => value === '')) {
                console.error('All fields are required');
                return;
            }

            
            await axios.post("http://localhost:2000/api/v7/post", formData);

         
            setInputs({ imgUrl: '' });
            setData({
                title: '',
                descreption: ''
            });

           
            toast.success('Post successfully created!', {
                position: toast.POSITION.TOP_CENTER
            });

        } catch (error) {
            console.log("Submit Error:", error);
        }
    };

    return (
        <div className='newpost'>
            <Sidebar />
            <div className="newpostcontainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Post</h1>
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
                            <div className="forminput">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange} value={data.title} />
                            </div>
                            <div className="forminput">
                                <label htmlFor="descreption">descreption</label>
                                <textarea id="descreption" name="descreption" placeholder="descreption" onChange={handleChange} value={data.descreption} />
                            </div>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default NewPost;
