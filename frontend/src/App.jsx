import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from "./pages/login/Login"
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import Rec from './pages/rec/Rec';
function App() {
  
  return (
    <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/single" element={<Single />} />
        <Route path="/new" element={<New />} />
        <Route path="/rec" element={<Rec />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;

