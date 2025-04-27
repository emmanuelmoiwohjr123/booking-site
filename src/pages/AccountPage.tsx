import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, CreditCard, Bell, Settings, LogOut, ChevronRight, Shield, Edit, Clock } from 'lucide-react';

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock user data - in a real app this would come from API/state
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phoneNumber: '+1 (555) 123-4567',
    joinDate: 'May 2023',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      roomName: '6-Bed Mixed Dormitory',
      status: 'upcoming',
      checkIn: '2025-07-15',
      checkOut: '2025-07-18',
      guests: 1,
      totalPrice: 117,
      roomImage: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      roomName: 'Private Double Room',
      status: 'completed',
      checkIn: '2025-02-10',
      checkOut: '2025-02-13',
      guests: 2,
      totalPrice: 285,
      roomImage: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
    
    // Clear error for the current field
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
    
    // Clear error for the current field
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) newErrors.email = 'Email is invalid';
    
    if (!loginForm.password.trim()) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signupForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!signupForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!signupForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupForm.email)) newErrors.email = 'Email is invalid';
    
    if (!signupForm.password.trim()) newErrors.password = 'Password is required';
    else if (signupForm.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!signupForm.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    else if (signupForm.confirmPassword !== signupForm.password) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateLogin()) {
      // In a real app, you would handle authentication here
      setIsLoggedIn(true);
      setActiveTab('profile');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSignup()) {
      // In a real app, you would handle registration here
      setIsLoggedIn(true);
      setActiveTab('profile');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    setFormType('login');
  };

  const toggleFormType = () => {
    setFormType(prev => prev === 'login' ? 'signup' : 'login');
    setErrors({});
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {formType === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {formType === 'login' 
                  ? 'Sign in to access your account and bookings' 
                  : 'Join WanderRest to start your adventure'}
              </p>
            </div>
            
            {formType === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="block text-gray-700 dark:text-gray-200 font-medium" htmlFor="password">
                      Password
                    </label>
                    <a href="#" className="text-sm text-teal-600 dark:text-teal-400 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition-colors mb-6"
                >
                  Sign In
                </button>
                
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={toggleFormType}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={signupForm.firstName}
                      onChange={handleSignupChange}
                      className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={signupForm.lastName}
                      onChange={handleSignupChange}
                      className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="signupEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="signupPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition-colors mb-6"
                >
                  Create Account
                </button>
                
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={toggleFormType}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <img 
                    src={userData.image} 
                    alt={userData.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{userData.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member since {userData.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`w-full flex items-center justify-between p-3 rounded-md ${
                        activeTab === 'profile' 
                          ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <div className="flex items-center">
                        <User className="mr-3" size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center justify-between p-3 rounded-md ${
                        activeTab === 'bookings' 
                          ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab('bookings')}
                    >
                      <div className="flex items-center">
                        <Calendar className="mr-3" size={20} />
                        <span>My Bookings</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center justify-between p-3 rounded-md ${
                        activeTab === 'payment' 
                          ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab('payment')}
                    >
                      <div className="flex items-center">
                        <CreditCard className="mr-3" size={20} />
                        <span>Payment Methods</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center justify-between p-3 rounded-md ${
                        activeTab === 'notifications' 
                          ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <div className="flex items-center">
                        <Bell className="mr-3" size={20} />
                        <span>Notifications</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center justify-between p-3 rounded-md ${
                        activeTab === 'settings' 
                          ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <div className="flex items-center">
                        <Settings className="mr-3" size={20} />
                        <span>Account Settings</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      className="w-full flex items-center p-3 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3" size={20} />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Information</h2>
                  <button className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    <Edit size={18} className="mr-1" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <div className="relative">
                      <img 
                        src={userData.image} 
                        alt={userData.name} 
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</h3>
                        <p className="text-gray-800 dark:text-white">{userData.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</h3>
                        <p className="text-gray-800 dark:text-white">{userData.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</h3>
                        <p className="text-gray-800 dark:text-white">{userData.phoneNumber}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</h3>
                        <p className="text-gray-800 dark:text-white">{userData.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            className="mr-3 rounded text-teal-600 focus:ring-teal-500"
                            defaultChecked
                          />
                          <label htmlFor="emailNotifications" className="text-gray-700 dark:text-gray-300">
                            Receive booking confirmations and updates via email
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="smsNotifications"
                            className="mr-3 rounded text-teal-600 focus:ring-teal-500"
                          />
                          <label htmlFor="smsNotifications" className="text-gray-700 dark:text-gray-300">
                            Receive booking confirmations and updates via SMS
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="promotionalEmails"
                            className="mr-3 rounded text-teal-600 focus:ring-teal-500"
                            defaultChecked
                          />
                          <label htmlFor="promotionalEmails" className="text-gray-700 dark:text-gray-300">
                            Receive promotional offers and newsletters
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Bookings</h2>
                  
                  {bookings.length > 0 ? (
                    <div className="space-y-6">
                      {bookings.map(booking => (
                        <div 
                          key={booking.id} 
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4">
                              <img 
                                src={booking.roomImage} 
                                alt={booking.roomName} 
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            
                            <div className="p-6 md:w-3/4">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                    {booking.roomName}
                                  </h3>
                                  <div className="flex items-center mb-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      booking.status === 'upcoming' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                    }`}>
                                      {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">Total Price</p>
                                  <p className="text-xl font-bold text-gray-800 dark:text-white">${booking.totalPrice}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">Check-in</p>
                                  <p className="font-medium text-gray-800 dark:text-white flex items-center">
                                    <Calendar className="mr-1 text-teal-600 dark:text-teal-400" size={16} />
                                    {formatDate(booking.checkIn)}
                                  </p>
                                </div>
                                
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">Check-out</p>
                                  <p className="font-medium text-gray-800 dark:text-white flex items-center">
                                    <Calendar className="mr-1 text-teal-600 dark:text-teal-400" size={16} />
                                    {formatDate(booking.checkOut)}
                                  </p>
                                </div>
                                
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">Guests</p>
                                  <p className="font-medium text-gray-800 dark:text-white flex items-center">
                                    <User className="mr-1 text-teal-600 dark:text-teal-400" size={16} />
                                    {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                                  View Details
                                </button>
                                
                                {booking.status === 'upcoming' && (
                                  <button className="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium py-2 px-4 rounded-md transition-colors">
                                    Cancel Booking
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                        <Calendar className="text-gray-500 dark:text-gray-400" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No bookings yet</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        You haven't made any bookings with us yet. Ready to start your adventure?
                      </p>
                      <button
                        onClick={() => navigate('/rooms')}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                      >
                        Browse Rooms
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Methods</h2>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors text-sm">
                    Add New Card
                  </button>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative">
                    <div className="absolute top-4 right-4">
                      <span className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Default
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md mr-4">
                        <CreditCard className="text-blue-500" size={24} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Expires 08/2028</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-md mr-4">
                        <CreditCard className="text-indigo-500" size={24} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">•••• •••• •••• 8888</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Expires 11/2026</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium">
                        Set as default
                      </button>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center">
                    <div className="mr-4 text-teal-600 dark:text-teal-400">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Secure Payment Processing</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        All payment information is encrypted and securely processed. We never store your full card details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Notifications</h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Booking Confirmations</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails when your booking is confirmed</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="bookingConfirmations" className="sr-only" defaultChecked />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-6"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Booking Reminders</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminders before your stay</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="bookingReminders" className="sr-only" defaultChecked />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-6"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Promotional Offers</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive special offers and discounts</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="promotionalOffers" className="sr-only" defaultChecked />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-6"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Newsletters</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive monthly newsletters and updates</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="newsletters" className="sr-only" />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">SMS Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Booking Confirmations</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive text messages when your booking is confirmed</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="smsBookingConfirmations" className="sr-only" />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Booking Reminders</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive text reminders before your stay</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="smsBookingReminders" className="sr-only" />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-800 dark:text-white font-medium">Special Offers</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive text messages about special promotions</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                          <input type="checkbox" id="smsSpecialOffers" className="sr-only" />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Account Settings</h2>
                
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="currentPassword">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="newPassword">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="confirmNewPassword">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Language & Currency</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="language">
                        Language
                      </label>
                      <select
                        id="language"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 appearance-none"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="it">Italiano</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="currency">
                        Currency
                      </label>
                      <select
                        id="currency"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 appearance-none"
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                        <option value="aud">AUD ($)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveBookingHistory"
                        className="mr-3 rounded text-teal-600 focus:ring-teal-500"
                        defaultChecked
                      />
                      <label htmlFor="saveBookingHistory" className="text-gray-700 dark:text-gray-300">
                        Save my booking history and preferences
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="locationHistory"
                        className="mr-3 rounded text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor="locationHistory" className="text-gray-700 dark:text-gray-300">
                        Use my location data for personalized recommendations
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="shareMarketing"
                        className="mr-3 rounded text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor="shareMarketing" className="text-gray-700 dark:text-gray-300">
                        Share my information with trusted marketing partners
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-6">
                    <Clock className="text-yellow-500 mr-3 flex-shrink-0" size={24} />
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      You can request a full copy of your personal data or account deletion at any time.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                    <button className="w-full md:w-auto text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
                      Download my data
                    </button>
                    
                    <button className="w-full md:w-auto text-red-500 hover:text-red-700 font-medium">
                      Delete my account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;