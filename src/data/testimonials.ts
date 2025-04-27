import { Testimonial } from '../types/testimonial';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'London, UK',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    text: 'This hostel exceeded all my expectations! The beds were comfortable, the staff was incredibly friendly, and I met some amazing people in the common areas. The location was perfect for exploring the city.',
    roomType: '6-Bed Mixed Dormitory'
  },
  {
    id: 2,
    name: 'Carlos Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
    text: 'Wonderful place with a great atmosphere. The private room was clean and quiet, but I could still socialize in the common areas when I wanted to. The staff gave me excellent recommendations for local food.',
    roomType: 'Private Double Room'
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'Sydney, Australia',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    text: 'As a solo female traveler, I felt very safe in the female dorm. The lockers were spacious, the bathrooms were always clean, and the hostel organized fun activities that made it easy to meet people.',
    roomType: '4-Bed Female Dormitory'
  }
];