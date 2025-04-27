import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, ChevronLeft, ChevronRight, Camera, Check, X } from 'lucide-react';
import { rooms } from '../data/rooms';
import DatePicker from '../components/DatePicker';
import { useBooking } from '../context/BookingContext';

const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setBookingDetails } = useBooking();
  const room = rooms.find(r => r.id === parseInt(id || '0'));
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (!room) {
      navigate('/rooms');
    }
  }, [room, navigate]);

  if (!room) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleBook = () => {
    setBookingDetails({
      roomId: room.id,
      roomName: room.name,
      guests,
      price: room.price,
      dates: {
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 2))
      }
    });
    navigate(`/booking/${room.id}`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-gray-500 mx-2">/</span>
                <Link to="/rooms" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                  Rooms
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-700 dark:text-gray-300">{room.name}</span>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Room Images Section */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden h-96">
              <img 
                src={room.images[currentImageIndex]} 
                alt={`${room.name} - image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Gallery Button */}
              <button 
                className="absolute bottom-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-md px-3 py-2 flex items-center transition-colors"
                onClick={() => setShowGallery(true)}
              >
                <Camera size={18} className="mr-2" />
                <span>View Gallery</span>
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white rounded-md px-3 py-1 text-sm">
                {currentImageIndex + 1} / {room.images.length}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2 mt-4">
              {room.images.slice(0, 5).map((image, index) => (
                <button 
                  key={index}
                  className={`rounded-md overflow-hidden h-20 ${
                    currentImageIndex === index 
                      ? 'ring-2 ring-teal-500' 
                      : 'ring-1 ring-gray-300 dark:ring-gray-700'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${room.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Room Description */}
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{room.name}</h1>
              
              <div className="mb-6 flex items-center text-gray-600 dark:text-gray-300">
                <Users className="mr-2" size={20} />
                <span>Capacity: {room.capacity} guests</span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {room.description}
              </p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Room Features</h2>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {room.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <Check className="mr-2 text-teal-500" size={18} />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">House Rules</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <Check className="mr-2 mt-1 text-teal-500 flex-shrink-0" size={18} />
                      <span>Check-in time: 2:00 PM - 10:00 PM</span>
                    </li>
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <Check className="mr-2 mt-1 text-teal-500 flex-shrink-0" size={18} />
                      <span>Check-out time: 11:00 AM</span>
                    </li>
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <X className="mr-2 mt-1 text-red-500 flex-shrink-0" size={18} />
                      <span>No smoking allowed in the rooms</span>
                    </li>
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <X className="mr-2 mt-1 text-red-500 flex-shrink-0" size={18} />
                      <span>Quiet hours: 11:00 PM - 7:00 AM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Book This Room</h2>
                <div className="text-teal-600 dark:text-teal-400 text-xl font-bold">${room.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span></div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Check-in / Check-out
                  </label>
                  <DatePicker />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Guests
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 appearance-none"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">$119 x 2 nights</span>
                  <span className="text-gray-800 dark:text-gray-200">${room.price * 2}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Cleaning fee</span>
                  <span className="text-gray-800 dark:text-gray-200">$15</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-300">Service fee</span>
                  <span className="text-gray-800 dark:text-gray-200">$10</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-800 dark:text-gray-100">Total</span>
                  <span className="text-gray-800 dark:text-gray-100">${room.price * 2 + 25}</span>
                </div>
              </div>
              
              <button 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition-colors"
                onClick={handleBook}
              >
                Book Now
              </button>
              
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Screen Gallery */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setShowGallery(false)}
          >
            <X size={32} />
          </button>
          
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              <img 
                src={room.images[currentImageIndex]} 
                alt={`${room.name} - image ${currentImageIndex + 1}`}
                className="w-full max-h-[80vh] object-contain"
              />
              
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight size={28} />
              </button>
            </div>
            
            <div className="mt-4 text-center text-white">
              {currentImageIndex + 1} / {room.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailPage;