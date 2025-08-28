import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import HomePage from './pages/HomePage';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;