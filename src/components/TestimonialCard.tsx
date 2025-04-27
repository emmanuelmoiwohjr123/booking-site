import { Star } from 'lucide-react';
import { Testimonial } from '../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
      <img 
        src={testimonial.avatar} 
        alt={testimonial.name} 
        className="w-20 h-20 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
      />
      
      <div className="flex-1">
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
          "{testimonial.text}"
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
            Stayed in {testimonial.roomType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;