import React, { useState } from 'react';
import './Signup.css';
import Logo from '../../components/Logo/Logo';
import InputField from '../../components/InputField/InputField';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
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
    
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle successful signup
      console.log('Form submitted successfully', formData);
      // Here you would typically call your API to register the user
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      <div className="hidden md:flex md:w-1/2 bg-pattern flex-col justify-center items-center p-10">
        <h1 className="text-white text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-white text-xl">Start your journey with us today.</p>
      </div>
      
      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-10 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo />
            <h2 className="text-3xl font-bold text-gray-800 mt-6">Create an account</h2>
            <p className="text-gray-600 mt-2">Sign up to get started with our services</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Razin Mohamed"
              required
            />
            
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
            
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
            />
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;