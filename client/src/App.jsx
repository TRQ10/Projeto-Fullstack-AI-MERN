import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';

import { logo } from './assets';
import { CreatePost, Home, NEncontrado, Perfil, Recuperação, Registro, Reset, Senha, Usuario } from './pages'

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
import { Navbar } from './components/Navbar';
import './index.css'




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"))
  

return (
  
  <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<AuthorizeUser><CreatePost/></AuthorizeUser>} />
        <Route path="/usuario" element={<Usuario/>} />
        <Route path="/senha" element={<ProtectRoute><Senha/></ProtectRoute>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/perfil" element={<AuthorizeUser><Perfil/></AuthorizeUser>} />
        <Route path="/reset" element={<Reset/>} />
        <Route path="*" element={<NEncontrado/>} />
        <Route path="/recuperacao" element={<Recuperação/>} />
      </Routes>   
  </BrowserRouter>
 
)};

export default App;