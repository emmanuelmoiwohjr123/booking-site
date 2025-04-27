import { Link } from 'react-router-dom';
import { User, Star, ArrowRight } from 'lucide-react';
import { Room } from '../types/room';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
      <div className="relative">
        <img 
          src={room.images[0]} 
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-3 bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 font-semibold py-1 px-2 rounded-md text-sm">
          ${room.price}<span className="text-xs font-normal text-gray-500 dark:text-gray-400">/night</span>
        </div>
        
        {room.popular && (
          <div className="absolute top-0 left-0 m-3 bg-orange-500 text-white font-medium py-1 px-2 rounded-md text-xs uppercase">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{room.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${i < room.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
            {room.reviews} reviews
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <User className="mr-1" size={16} />
            <span className="text-sm">{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {room.type}
          </div>
        </div>
        
        <div className="space-x-3">
          <Link
            to={`/rooms/${room.id}`}
            className="inline-flex items-center text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            View Details
            <ArrowRight className="ml-1" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;