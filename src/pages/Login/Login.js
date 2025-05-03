/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo/Logo.js';
import InputField from '../../components/InputField/InputField.js';
import { useAuth } from '../../context/AuthContext.js';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the previous location the user was trying to access
  const from = location.state?.from?.pathname || '/dashboard';
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const loginUser = async (userData) => {
    setIsLoading(true);
    setApiError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.message || 'Invalid credentials. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const result = await loginUser(formData);
        console.log('Login successful:', result);
        
        // Use the login function from AuthContext to store user data
        // and store the token in localStorage
        login(result);
        localStorage.setItem('token', result.token);
        
        // Redirect user to where they were trying to go or dashboard
        navigate(from, { replace: true });
      } catch (error) {
        // Error is already handled in loginUser function
      }
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      <div className="hidden md:flex md:w-1/2 bg-pattern flex-col justify-center items-center p-10">
        <h1 className="text-white text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-white text-xl">Sign in to continue your journey.</p>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-10 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo />
            <h2 className="text-3xl font-bold text-gray-800 mt-6">Log in to your account</h2>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="razin@example.com"
              required
            />
            
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              required
            />
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {apiError}
              </div>
            )}
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;