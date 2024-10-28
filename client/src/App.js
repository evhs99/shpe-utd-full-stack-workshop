import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages to be routed by the React router
import Home from './components/Home';
import Profile from './components/Profile';
import PostPage from './components/PostPage';

import './App.css';

function App() {
  return (

    // using React's router to route components to pages for the website
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;