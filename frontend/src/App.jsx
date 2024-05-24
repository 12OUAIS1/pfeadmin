import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from "./pages/login/Login"
import List from './pages/list/List';
import Singleadmin from "./pages/singleadmin/Singleadmin"
import New from './pages/new/New';
import Rec from './pages/rec/Rec';
import Single from './pages/single/Single';
import Newadmin from './pages/newadmin/Newadmin';
import Adata from './pages/adata/Adata';
import { useDispatch } from 'react-redux'; 
import { authActions } from './store';
import { ToastContainer } from 'react-toastify';
import Offre from "./pages/offre/Offre"
import Reclamation from "./pages/reclamation/Reclamation"
import NewPost from './pages/newpost/Newpost';
import Stats from "./pages/stats/Stats"
import Post from "./pages/post/Post"
import "./index.css"
function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    const id = sessionStorage.getItem("id")
   if (id){
    dispatch(authActions.login());
  }
    })

    return (
   <div className="app">
     <BrowserRouter>
     <ToastContainer /> 
 <Routes>
   <Route path="/home" element={<Home />} />
   <Route path="/" element={<Login />} />
   <Route path="/list" element={<List />} />
   <Route path="/new" element={<New />} />
   <Route path="/rec" element={<Rec />} />
   <Route path="/single" element={<Single />} />
   <Route path="/newadmin" element={<Newadmin />} /> 
   <Route path="/adata" element={<Adata />} />
   <Route path="/singleadmin" element={<Singleadmin/>} />
   <Route path="/offre" element={<Offre/>} />
   <Route path="/reclam" element={<Reclamation/>} />
   <Route path="/npost" element={<NewPost/>} />
   <Route path="/stats" element={<Stats/>} />
   <Route path="/post" element={<Post/>} />
   <Route path="/np" element={<NewPost/>} />

</Routes>
</BrowserRouter>
   </div>
  );
}


export default App;

