import { Room } from '../types/room';

export const rooms: Room[] = [
  {
    id: 1,
    name: '6-Bed Mixed Dormitory',
    type: 'Shared Room',
    description: 'Comfortable mixed dormitory with 6 single beds, personal reading lights, power outlets, and secure lockers for each guest. Perfect for solo travelers looking to meet others.',
    price: 39,
    capacity: 1,
    rating: 4.8,
    reviews: 124,
    popular: true,
    images: [
      'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3771823/pexels-photo-3771823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2506991/pexels-photo-2506991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    amenities: [
      'Secure Lockers',
      'Personal Reading Light',
      'Power Outlets',
      'Air Conditioning',
      'Free WiFi',
      'Shared Bathroom',
      'Fresh Linens'
    ]
  },
  {
    id: 2,
    name: '4-Bed Female Dormitory',
    type: 'Shared Room',
    description: 'Female-only dormitory with 4 single beds, creating a more private and secure environment for female travelers. Includes all the standard amenities and a little extra space.',
    price: 45,
    capacity: 1,
    rating: 4.9,
    reviews: 87,
    popular: false,
    images: [
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    amenities: [
      'Secure Lockers',
      'Personal Reading Light',
      'Power Outlets',
      'Air Conditioning',
      'Free WiFi',
      'Shared Bathroom',
      'Fresh Linens',
      'Female-Only Floor'
    ]
  },
  {
    id: 3,
    name: 'Private Double Room',
    type: 'Private Room',
    description: 'Cozy private room with a comfortable double bed and en-suite bathroom. Ideal for couples or travelers who want more privacy without sacrificing the social hostel experience.',
    price: 95,
    capacity: 2,
    rating: 4.7,
    reviews: 56,
    popular: true,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    amenities: [
      'Double Bed',
      'Private Ensuite',
      'Air Conditioning',
      'Free WiFi',
      'Fresh Linens',
      'Towels Provided',
      'Small Desk'
    ]
  },
  {
    id: 4,
    name: '8-Bed Mixed Dormitory',
    type: 'Shared Room',
    description: 'Our largest dormitory option, perfect for groups or budget-conscious travelers. Features custom-designed pod beds for extra privacy, despite the larger room capacity.',
    price: 35,
    capacity: 1,
    rating: 4.5,
    reviews: 139,
    popular: false,
    images: [
      'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3771823/pexels-photo-3771823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2506991/pexels-photo-2506991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    amenities: [
      'Pod-Style Beds',
      'Privacy Curtains',
      'Secure Lockers',
      'Personal Reading Light',
      'Power Outlets',
      'Air Conditioning',
      'Free WiFi',
      'Shared Bathroom'
    ]
  },
  {
    id: 5,
    name: 'Private Twin Room',
    type: 'Private Room',
    description: 'Private room with two single beds, perfect for friends traveling together who want their own space. Includes a small private bathroom and all standard amenities.',
    price: 85,
    capacity: 2,
    rating: 4.6,
    reviews: 42,
    popular: false,
    images: [
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    amenities: [
      'Two Single Beds',
      'Private Ensuite',
      'Air Conditioning',
      'Free WiFi',
      'Fresh Linens',
      'Towels Provided',
      'Small Desk'
    ]
  },
  {
    id: 6,
    name: 'Deluxe Private Room',
    type: 'Private Room',
    description: 'Our premium private room offering with a queen-sized bed, larger ensuite bathroom, and additional amenities. Perfect for those who want hostel social life with hotel comfort.',
    price: 119,
    capacity: 2,
    rating: 4.9,
    reviews: 38,
    popular: true,
    images: [
      'https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    amenities: [
      'Queen Bed',
      'Spacious Private Ensuite',
      'Air Conditioning',
      'Free WiFi',
      'Premium Linens',
      'Towels Provided',
      'Desk and Chair',
      'Small Refrigerator',
      'City View'
    ]
  }
];