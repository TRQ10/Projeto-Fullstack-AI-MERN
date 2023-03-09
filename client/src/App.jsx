import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import { logo } from './assets';
import Footer from './components/Footer';
import { Home, CreatePost } from './pages';
Modal.setAppElement('#root');

const App = () => (
  <>
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#0F0F0F] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] overflow-hidden">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain text-[#fefefe]" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#fefefe] text-[#321b6c] px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className='bg-[#5d20d3] w-full p-0 m-0 h-auto py-4 overflow-hidden'>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
    <footer className='overflow-hidden'>
      <Footer/>
    </footer>
  </BrowserRouter>
  
  </>
  
);

export default App;
