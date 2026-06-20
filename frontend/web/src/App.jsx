import { useState } from 'react';
import { Routes, Route, } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import './App.css';

function App() {

  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<SingUpPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/settings" element={<SettingPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    </div>
  )
}

export default App
