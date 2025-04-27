import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingDates {
  checkIn: Date;
  checkOut: Date;
}

export interface BookingDetails {
  roomId: number;
  roomName: string;
  guests: number;
  price: number;
  dates: BookingDates;
}

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails | null>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};