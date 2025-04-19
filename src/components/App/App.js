import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CDCForm from '../../pages/CDCForm/CDCForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-cdc" element={<CDCForm />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;