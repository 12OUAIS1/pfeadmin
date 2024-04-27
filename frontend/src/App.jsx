import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from "./pages/login/Login"
import List from './pages/list/List';

import New from './pages/new/New';
import Rec from './pages/rec/Rec';
import Single from './pages/single/Single';
import Newadmin from './pages/newadmin/Newadmin';

function App() {

    return (
   <div className="app">
     <BrowserRouter>
 
 <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/login" element={<Login />} />
   <Route path="/list" element={<List />} />
   <Route path="/new" element={<New />} />
   <Route path="/rec" element={<Rec />} />
   <Route path="/single" element={<Single />} />
   <Route path="/newadmin" element={<Newadmin />} />
</Routes>
</BrowserRouter>
   </div>
  );
}


export default App;

