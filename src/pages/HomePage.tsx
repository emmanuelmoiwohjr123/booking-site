import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Coffee, Wifi, MapPin, Star } from 'lucide-react';
import { rooms } from '../data/rooms';
import { testimonials } from '../data/testimonials';
import DatePicker from '../components/DatePicker';
import RoomCard from '../components/RoomCard';
import TestimonialCard from '../components/TestimonialCard';

const HomePage = () => {
  const [featuredRooms, setFeaturedRooms] = useState(rooms.slice(0, 3));
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-900 flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/2017802/pexels-photo-2017802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Perfect <span className="text-teal-400">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Comfortable, affordable, and unforgettable stays for every traveler
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                to="/rooms" 
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block text-center"
              >
                Browse Rooms
              </Link>
              <Link 
                to="/about" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block text-center backdrop-blur-sm"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 -mt-20 relative z-30">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Find Your Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200 font-medium">Check-in / Check-out</label>
                <DatePicker />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200 font-medium">Guests</label>
                <div className="relative">
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                  <Users className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={20} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200 font-medium opacity-0">Search</label>
                <Link 
                  to="/rooms"
                  className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-medium p-3 rounded-md transition-colors text-center"
                >
                  Search Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Featured Rooms</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular accommodations, perfect for solo travelers and groups
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/rooms" 
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Hostel Amenities</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enjoy these complimentary features during your stay with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform hover:scale-105">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Wifi className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Free High-Speed WiFi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay connected with friends and family with our high-speed internet access.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform hover:scale-105">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Coffee className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Communal Kitchen</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Prepare your own meals in our fully equipped kitchen with modern appliances.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform hover:scale-105">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Common Areas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Meet fellow travelers in our comfortable lounge and outdoor patio spaces.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform hover:scale-105">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Central Location</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Located in the heart of the city, close to major attractions and public transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">What Our Guests Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from travelers who've stayed with us
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-teal-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay now and experience the perfect blend of comfort, community, and exploration.
          </p>
          <Link 
            to="/booking" 
            className="inline-block bg-white text-teal-600 font-medium px-8 py-3 rounded-md transition-colors hover:bg-gray-100"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;