import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, User, Calendar, Shield, AlertCircle } from 'lucide-react';
import { rooms } from '../data/rooms';
import { useBooking } from '../context/BookingContext';

const BookingPage = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails } = useBooking();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Find room if roomId is provided
  const room = roomId ? rooms.find(r => r.id === parseInt(roomId)) : null;
  
  useEffect(() => {
    // If roomId is provided but not found in the available rooms, redirect to rooms page
    if (roomId && !room) {
      navigate('/rooms');
    }
    
    // If we have a room from the URL but no booking details, initialize them
    if (room && (!bookingDetails || bookingDetails.roomId !== parseInt(roomId))) {
      setBookingDetails({
        roomId: room.id,
        roomName: room.name,
        guests: 1,
        price: room.price,
        dates: {
          checkIn: new Date(),
          checkOut: new Date(new Date().setDate(new Date().getDate() + 2))
        }
      });
    }
    
    // If no booking details at all, redirect to rooms page
    if (!bookingDetails && !room) {
      navigate('/rooms');
    }
  }, [roomId, room, bookingDetails, navigate, setBookingDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    let newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    } else if (step === 2) {
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Expiry date must be in MM/YY format';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCvc)) newErrors.cardCvc = 'CVC must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleCompleteBooking = () => {
    // In a real application, you would submit the form data to your backend here
    // For this demo, we'll just simulate a success and redirect to success page
    alert('Booking successful! Your confirmation number is: ' + Math.random().toString(36).substring(2, 10).toUpperCase());
    navigate('/');
  };

  // If no booking details are available yet, show loading or redirect
  if (!bookingDetails && !room) {
    return null;
  }

  // Use either the passed room or the one from booking details
  const selectedRoom = room || (bookingDetails?.roomId ? rooms.find(r => r.id === bookingDetails.roomId) : null);
  
  // If we still don't have a room, something went wrong
  if (!selectedRoom) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">We couldn't find the room you're trying to book.</p>
        <button
          onClick={() => navigate('/rooms')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
        >
          Browse Available Rooms
        </button>
      </div>
    );
  }

  // Calculate total price
  const stayLength = 2; // In a real app, this would be calculated from check-in/out dates
  const cleaningFee = 15;
  const serviceFee = 10;
  const totalPrice = selectedRoom.price * stayLength + cleaningFee + serviceFee;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Complete Your Booking</h1>
        
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className={`flex-1 flex flex-col items-center ${currentStep >= 1 ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 1 ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                <User size={20} />
              </div>
              <span className="text-sm font-medium">Guest Info</span>
            </div>
            
            <div className={`w-full h-1 mx-4 ${currentStep >= 2 ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
            
            <div className={`flex-1 flex flex-col items-center ${currentStep >= 2 ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 2 ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                <CreditCard size={20} />
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            
            <div className={`w-full h-1 mx-4 ${currentStep >= 3 ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
            
            <div className={`flex-1 flex flex-col items-center ${currentStep >= 3 ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 3 ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                <Shield size={20} />
              </div>
              <span className="text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              {/* Step 1: Guest Information */}
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Guest Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="firstName">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="lastName">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="email">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="specialRequests">
                      Special Requests (optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      placeholder="Any special requirements or requests..."
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Payment Information</h2>
                  
                  <div className="mb-6">
                    <div className="mb-6">
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="cardName">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="cardNumber">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="cardExpiry">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="cardCvc">
                          CVC *
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.cardCvc ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200`}
                          placeholder="123"
                        />
                        {errors.cardCvc && <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="text-teal-600 dark:text-teal-400 mr-3" size={24} />
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Secure Payment</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Your payment information is encrypted and processed securely
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Booking Confirmation</h2>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="text-gray-800 dark:text-white">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-800 dark:text-white">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="text-gray-800 dark:text-white">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Payment</p>
                        <p className="text-gray-800 dark:text-white">•••• •••• •••• {formData.cardNumber.slice(-4)}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Room Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Room Type</p>
                        <p className="text-gray-800 dark:text-white">{selectedRoom.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Guests</p>
                        <p className="text-gray-800 dark:text-white">{bookingDetails?.guests || 1} {(bookingDetails?.guests || 1) === 1 ? 'Guest' : 'Guests'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                        <p className="text-gray-800 dark:text-white">{bookingDetails?.dates?.checkIn.toLocaleDateString() || new Date().toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                        <p className="text-gray-800 dark:text-white">{bookingDetails?.dates?.checkOut.toLocaleDateString() || new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {formData.specialRequests && (
                      <>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Special Requests</h3>
                        <p className="text-gray-800 dark:text-white mb-6">{formData.specialRequests}</p>
                      </>
                    )}
                    
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Payment Summary</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">${selectedRoom.price} x 2 nights</span>
                        <span className="text-gray-800 dark:text-white">${selectedRoom.price * 2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Cleaning fee</span>
                        <span className="text-gray-800 dark:text-white">${cleaningFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Service fee</span>
                        <span className="text-gray-800 dark:text-white">${serviceFee}</span>
                      </div>
                      <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-800 dark:text-white">Total</span>
                          <span className="text-gray-800 dark:text-white">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-6">
                    <Calendar className="text-yellow-500 mr-3 flex-shrink-0" size={24} />
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      By completing this booking, you agree to our terms and conditions, including the cancellation policy.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteBooking}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Complete Booking
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Booking</h3>
              
              <div className="flex items-center mb-6">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{selectedRoom.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {bookingDetails?.guests || 1} {(bookingDetails?.guests || 1) === 1 ? 'Guest' : 'Guests'}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 py-4 mb-4">
                <div className="flex items-center mb-4">
                  <Calendar className="text-gray-500 dark:text-gray-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Check-in</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {bookingDetails?.dates?.checkIn.toLocaleDateString() || new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="text-gray-500 dark:text-gray-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Check-out</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {bookingDetails?.dates?.checkOut.toLocaleDateString() || new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">${selectedRoom.price} x 2 nights</span>
                  <span className="text-gray-800 dark:text-gray-200">${selectedRoom.price * 2}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Cleaning fee</span>
                  <span className="text-gray-800 dark:text-gray-200">${cleaningFee}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-300">Service fee</span>
                  <span className="text-gray-800 dark:text-gray-200">${serviceFee}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-800 dark:text-gray-100">Total</span>
                  <span className="text-gray-800 dark:text-gray-100">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;