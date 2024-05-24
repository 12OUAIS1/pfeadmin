import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        imgUrl: '' 
    });
    const [data, setData] = useState({
        email: "",
         password:"", 
         nom_complet:"", 
        phone:""
        ,address:""
        ,idNumber:""
        ,rank:""
        ,badgeNumber:""
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
                email: data.email.trim(),
                nom_complet: data.nom_complet.trim(),
                password: data.password.trim(),
                phone: data.phone.trim(),
                address: data.address.trim(),
                idNumber: data.idNumber.trim(),
                rank: data.rank.trim(),
                badgeNumber:data.badgeNumber.trim(),
            };

           
            if (formData.imgUrl === '') {
                console.error('Invalid imgUrl:', formData.imgUrl);
                return;
            }

           
            if (Object.values(formData).some(value => value === '')) {
                console.error('All fields are required');
                return;
            }

            
            await axios.post("http://localhost:2000/api/v5/admin/signup", formData);

            setInputs({ imgUrl: '' });
            setData({
                email: '',
                password: '',
                nom_complet: '',
                phone: '',
                address: '',
                idNumber: '',
                rank: '',
                badgeNumber: ''
            });

           
            toast.success('Admin successfully created!', {
                position: toast.POSITION.TOP_CENTER
            });

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
                            <div className="forminput">
        <label htmlFor="nom_complet">Name</label>
        <input type="text" id="nom_complet" name="nom_complet" placeholder="John" onChange={handleChange} value={data.nom_complet} />
    </div>
    <div className="forminput">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="john@example.com" onChange={handleChange} value={data.email} />
    </div>
    <div className="forminput">
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" name="phone" placeholder="123-456-7890" onChange={handleChange} value={data.phone} />
    </div>
    <div className="forminput">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="********" onChange={handleChange} value={data.password} />
    </div>
    <div className="forminput">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" placeholder="123 Main St, City" onChange={handleChange} value={data.address} />
    </div>
    <div className="forminput">
        <label htmlFor="idNumber">ID Number</label>
        <input type="text" id="idNumber" name="idNumber" placeholder="ID123456" onChange={handleChange} value={data.idNumber} />
    </div>
    <div className="forminput">
        <label htmlFor="rank">Rank</label>
        <input type="text" id="rank" name="rank" placeholder="Admin" onChange={handleChange} value={data.rank} />
    </div>
    <div className="forminput">
        <label htmlFor="badgeNumber">Badge Number</label>
        <input type="text" id="badgeNumber" name="badgeNumber" placeholder="123" onChange={handleChange} value={data.badgeNumber} />
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

export default Newadmin;
