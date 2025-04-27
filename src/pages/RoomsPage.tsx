import { useState, useEffect } from 'react';
import { Sliders, Search, Users, CheckCircle } from 'lucide-react';
import { rooms } from '../data/rooms';
import RoomCard from '../components/RoomCard';

const RoomsPage = () => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState(200);
  const [amenities, setAmenities] = useState({
    privateEnsuite: false,
    lockers: false,
    airConditioning: false,
    freeWifi: false
  });

  useEffect(() => {
    let result = rooms;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(room => 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Guest count filter
    if (guestCount) {
      result = result.filter(room => room.capacity >= parseInt(guestCount));
    }
    
    // Price filter
    result = result.filter(room => room.price <= priceRange);
    
    // Amenities filter
    if (amenities.privateEnsuite) {
      result = result.filter(room => room.amenities.includes('Private Ensuite'));
    }
    if (amenities.lockers) {
      result = result.filter(room => room.amenities.includes('Secure Lockers'));
    }
    if (amenities.airConditioning) {
      result = result.filter(room => room.amenities.includes('Air Conditioning'));
    }
    if (amenities.freeWifi) {
      result = result.filter(room => room.amenities.includes('Free WiFi'));
    }
    
    setFilteredRooms(result);
  }, [searchTerm, guestCount, priceRange, amenities]);

  const handleAmenityChange = (amenity: keyof typeof amenities) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setGuestCount('');
    setPriceRange(200);
    setAmenities({
      privateEnsuite: false,
      lockers: false,
      airConditioning: false,
      freeWifi: false
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Rooms</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the perfect accommodation for your stay, from shared dormitories to private rooms
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            
            <div className="w-full md:w-64 relative">
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 appearance-none"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              >
                <option value="">Any number of guests</option>
                <option value="1">1+ Guests</option>
                <option value="2">2+ Guests</option>
                <option value="4">4+ Guests</option>
                <option value="6">6+ Guests</option>
                <option value="8">8+ Guests</option>
              </select>
              <Users className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="mr-2" size={20} />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Price Range (Up to ${priceRange})
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>$10</span>
                    <span>$200</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privateEnsuite"
                        className="mr-2 rounded text-teal-600 focus:ring-teal-500"
                        checked={amenities.privateEnsuite}
                        onChange={() => handleAmenityChange('privateEnsuite')}
                      />
                      <label htmlFor="privateEnsuite" className="text-gray-700 dark:text-gray-200">
                        Private Ensuite
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lockers"
                        className="mr-2 rounded text-teal-600 focus:ring-teal-500"
                        checked={amenities.lockers}
                        onChange={() => handleAmenityChange('lockers')}
                      />
                      <label htmlFor="lockers" className="text-gray-700 dark:text-gray-200">
                        Secure Lockers
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="airConditioning"
                        className="mr-2 rounded text-teal-600 focus:ring-teal-500"
                        checked={amenities.airConditioning}
                        onChange={() => handleAmenityChange('airConditioning')}
                      />
                      <label htmlFor="airConditioning" className="text-gray-700 dark:text-gray-200">
                        Air Conditioning
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="freeWifi"
                        className="mr-2 rounded text-teal-600 focus:ring-teal-500"
                        checked={amenities.freeWifi}
                        onChange={() => handleAmenityChange('freeWifi')}
                      />
                      <label htmlFor="freeWifi" className="text-gray-700 dark:text-gray-200">
                        Free WiFi
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6 flex items-center">
          <p className="text-gray-600 dark:text-gray-300">
            {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'} found
          </p>
        </div>
        
        {/* Room Listings */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Search className="text-gray-500" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No rooms found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We couldn't find any rooms matching your search criteria.
            </p>
            <button
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;