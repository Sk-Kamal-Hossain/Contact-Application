import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddContact from './pages/AddContact';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="py-5">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
