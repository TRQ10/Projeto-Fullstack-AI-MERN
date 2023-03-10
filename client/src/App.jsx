import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost, Usuario, Senha, Perfil, Reset, NEncontrado, Registro, Recuperação } from './pages';


const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b sticky top-0 z-30 border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <div className='flex gap-2.5 item-center'>
      <Link to="/usuario" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Login</Link>
      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
      <Link to="/perfil" className="bg-[#76ff64] p-5 rounded-full"></Link>
      </div>

    </header>
    <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/senha" element={<Senha />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<NEncontrado />} />
        <Route path="/recuperacao" element={<Recuperação />} />
      </Routes>
    </main>
    
  </BrowserRouter>
);

export default App;