import React, { useState, useEffect } from 'react';
import './Profile.css';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Demo user data - in a real app, this would come from an API
  const [user, setUser] = useState({
    fullName: 'Razin Mohamed',
    email: 'razin@example.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Product Manager',
    department: 'Product Development',
    company: 'CDC Corp',
    location: 'San Francisco, CA',
    bio: 'Experienced product manager with a passion for creating intuitive user experiences.',
    profilePicture: null, // null indicates no uploaded picture
    plan: 'Professional',
    memberSince: 'April 2023',
    lastLogin: 'Today at 9:30 AM'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Simulate API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user.fullName) return '??';
    return user.fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/cookies
    console.log('Logging out...');
    // Redirect to login page would be done here
    window.location.href = '/login';
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    setShowDeleteConfirm(false);
    // In a real app, would call API to delete account then redirect
    window.location.href = '/signup';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex flex-col items-center text-center mb-6">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.fullName} 
                    className="h-24 w-24 rounded-full border-4 border-white shadow-md profile-avatar mb-4"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full flex items-center justify-center text-white font-bold shadow-md profile-avatar mb-4" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                    {getUserInitials()}
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                {user.jobTitle && <p className="text-gray-600 text-sm mt-1">{user.jobTitle}</p>}
                
                <div className="mt-4 py-2 px-4 bg-indigo-50 rounded-lg w-full">
                  <p className="text-sm font-medium text-indigo-700">{user.plan} Plan</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <nav className="flex flex-col space-y-1">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === 'profile' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Information
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === 'security' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Security
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('preferences')}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === 'preferences' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Preferences
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('billing')}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === 'billing' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Billing & Plans
                  </button>
                </nav>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
                
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full mt-3 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                  <Link 
                    to="/profile/edit" 
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </Link>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Full Name</div>
                      <div className="mt-1 text-sm text-gray-900">{user.fullName}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Email Address</div>
                      <div className="mt-1 text-sm text-gray-900">{user.email}</div>
                    </div>
                    
                    {user.phone && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Phone Number</div>
                        <div className="mt-1 text-sm text-gray-900">{user.phone}</div>
                      </div>
                    )}
                    
                    {user.location && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Location</div>
                        <div className="mt-1 text-sm text-gray-900">{user.location}</div>
                      </div>
                    )}
                    
                    {user.jobTitle && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Job Title</div>
                        <div className="mt-1 text-sm text-gray-900">{user.jobTitle}</div>
                      </div>
                    )}
                    
                    {user.department && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Department</div>
                        <div className="mt-1 text-sm text-gray-900">{user.department}</div>
                      </div>
                    )}
                    
                    {user.company && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Company</div>
                        <div className="mt-1 text-sm text-gray-900">{user.company}</div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Member Since</div>
                      <div className="mt-1 text-sm text-gray-900">{user.memberSince}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Last Login</div>
                      <div className="mt-1 text-sm text-gray-900">{user.lastLogin}</div>
                    </div>
                  </div>
                  
                  {user.bio && (
                    <div className="mt-6">
                      <div className="text-sm font-medium text-gray-500">Bio</div>
                      <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">{user.bio}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                </div>
                <div className="p-6">
                  <div className="mb-8">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Change Password</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">Password last changed: <span className="font-medium">3 months ago</span></p>
                          <p className="text-xs text-gray-500 mt-1">We recommend changing your password regularly for increased security.</p>
                        </div>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">Status: <span className="font-medium text-orange-600">Not Enabled</span></p>
                          <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account with two-factor authentication.</p>
                        </div>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Login History</h4>
                    <div className="bg-gray-50 p-4 rounded-lg divide-y divide-gray-200">
                      <div className="py-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Today at 9:30 AM</p>
                          <p className="text-xs text-gray-500">San Francisco, CA • Chrome on Windows</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Current</span>
                      </div>
                      
                      <div className="py-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Yesterday at 2:15 PM</p>
                          <p className="text-xs text-gray-500">San Francisco, CA • Safari on macOS</p>
                        </div>
                      </div>
                      
                      <div className="py-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">April 26, 2025 at 11:42 AM</p>
                          <p className="text-xs text-gray-500">San Francisco, CA • Chrome on Windows</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">User Preferences</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Email Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="comments" name="comments" type="checkbox" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">Document updates</label>
                          <p className="text-gray-500">Get notified when a document is updated or a new version is available.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="candidates" name="candidates" type="checkbox" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="candidates" className="font-medium text-gray-700">Security alerts</label>
                          <p className="text-gray-500">Receive alerts about security issues and login attempts.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="offers" name="offers" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="offers" className="font-medium text-gray-700">Marketing emails</label>
                          <p className="text-gray-500">Get notified about new features and special offers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Appearance</h4>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <input id="light" name="theme" type="radio" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="light" className="ml-3 block text-sm font-medium text-gray-700">Light</label>
                      </div>
                      <div className="flex items-center">
                        <input id="dark" name="theme" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="dark" className="ml-3 block text-sm font-medium text-gray-700">Dark</label>
                      </div>
                      <div className="flex items-center">
                        <input id="system" name="theme" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="system" className="ml-3 block text-sm font-medium text-gray-700">System default</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Language</h4>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Billing & Plans</h3>
                </div>
                <div className="p-6">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-800">Professional Plan</h4>
                        <p className="text-xs text-indigo-600 mt-0.5">$29.99 billed monthly</p>
                      </div>
                      <div className="text-sm font-medium text-indigo-700">
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-2">Payment Method</h4>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center mr-3">
                          <svg className="h-5 w-auto" fill="none" viewBox="0 0 36 21" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#a)">
                              <path d="m32.4 0h-28.8c-1.98 0-3.6 1.62-3.6 3.6v13.8c0 1.98 1.62 3.6 3.6 3.6h28.8c1.98 0 3.6-1.62 3.6-3.6v-13.8c0-1.98-1.62-3.6-3.6-3.6z" fill="#252525"/>
                              <path d="m13.68 15.48h-3.6l2.28-9h3.6l-2.28 9z" fill="#fff"/>
                              <path d="m24.12 6.72c-0.72-0.36-1.8-0.72-3.24-0.72-3.6 0-6.12 1.8-6.12 4.32 0 1.92 1.8 2.88 3.24 3.48 1.44 0.66 1.92 1.08 1.92 1.68s-1.14 1.14-2.22 1.14c-1.44 0-2.28-0.36-3.48-1.02l-0.48-0.24-0.54 3.06c0.9 0.36 2.52 0.72 4.2 0.78 3.96 0 6.48-1.74 6.54-4.5 0-1.5-0.9-2.64-3-3.6-1.26-0.6-2.04-1.02-2.04-1.62 0-0.54 0.66-1.14 2.04-1.14 1.14-0.06 2.04 0.24 2.7 0.54l0.36 0.12 0.48-2.88z" fill="#fff"/>
                              <path d="m27.6 15.48h-2.76l-0.18-0.78c-1.38 1.08-2.34 1.26-3.06 1.26-1.62 0-2.64-1.2-2.1-3.06l1.74-6.48h3.6l-0.78 2.82s-0.36 1.38-0.48 1.8c0.18 0 0.72-0.06 1.2-0.3 0.72-0.36 0.84-1.02 1.08-1.74l0.78-2.58h3.6l-2.64 9.06z" fill="#fff"/>
                              <path d="m9.36 15.48-3.36-9h-3.42l-0.06 0.24c2.7 0.66 5.1 2.16 5.94 3.9l-0.84 4.86h1.74z" fill="#fff"/>
                            </g>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500">Expires 09/2025</p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        Update
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-2">Billing History</h4>
                    <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                      <div className="py-3 px-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Apr 01, 2025</p>
                          <p className="text-xs text-gray-500">Professional Plan • Monthly</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-4">$29.99</span>
                          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                            Download
                          </button>
                        </div>
                      </div>
                      
                      <div className="py-3 px-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Mar 01, 2025</p>
                          <p className="text-xs text-gray-500">Professional Plan • Monthly</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-4">$29.99</span>
                          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                            Download
                          </button>
                        </div>
                      </div>
                      
                      <div className="py-3 px-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Feb 01, 2025</p>
                          <p className="text-xs text-gray-500">Professional Plan • Monthly</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-4">$29.99</span>
                          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Account</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete your account? This action cannot be undone, and all your data will be permanently removed.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="px-4 py-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;