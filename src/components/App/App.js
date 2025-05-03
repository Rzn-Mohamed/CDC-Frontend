import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CDCForm from '../../pages/CDCForm/CDCForm';
import Profile from '../../pages/Profile/Profile';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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