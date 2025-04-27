export interface Room {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  rating: number;
  reviews: number;
  popular: boolean;
  images: string[];
  amenities: string[];
}