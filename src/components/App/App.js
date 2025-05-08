import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../../pages/Signup/Signup.js';
import Login from '../../pages/Login/Login.js';
import Home from '../../pages/Home/Home.js';
import Dashboard from '../../pages/Dashboard/Dashboard.js';
import CDCForm from '../../pages/CDCForm/CDCForm.js';
import Profile from '../../pages/Profile/Profile.js';
import LandingPage from '../../pages/LandingPage/LandingPage.js';
import CDCTemplate from '../CDCTemplate/CDCTemplate.js';
import { AuthProvider } from '../../context/AuthContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            {/* CDC Template route */}
            <Route path="/cdc-template" element={<CDCTemplate />} />
            
            {/* Protected routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/create-cdc" element={
              <ProtectedRoute>
                <CDCForm />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;