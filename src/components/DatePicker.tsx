import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const DatePicker = () => {
  const { bookingDetails, setBookingDetails } = useBooking();
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: bookingDetails?.dates?.checkIn || new Date(),
    end: bookingDetails?.dates?.checkOut || new Date(new Date().setDate(new Date().getDate() + 2)),
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const getMonthData = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Get days from previous month to fill start of calendar
    const prevMonthDays = [];
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(new Date(year, month - 1, daysInPrevMonth - i));
    }
    
    // Current month days
    const monthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(new Date(year, month, i));
    }
    
    // Get days from next month to fill end of calendar
    const nextMonthDays = [];
    const totalSpots = 42; // 6 rows * 7 days
    const spotsToFill = totalSpots - (prevMonthDays.length + monthDays.length);
    
    for (let i = 1; i <= spotsToFill; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }
    
    return [...prevMonthDays, ...monthDays, ...nextMonthDays];
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isOtherMonth = (date: Date) => {
    return date.getMonth() !== currentMonth.getMonth();
  };

  const isSelectionStart = (date: Date) => {
    return date.getDate() === selectedRange.start.getDate() &&
           date.getMonth() === selectedRange.start.getMonth() &&
           date.getFullYear() === selectedRange.start.getFullYear();
  };

  const isSelectionEnd = (date: Date) => {
    return date.getDate() === selectedRange.end.getDate() &&
           date.getMonth() === selectedRange.end.getMonth() &&
           date.getFullYear() === selectedRange.end.getFullYear();
  };

  const isInRange = (date: Date) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    
    // If we're selecting a range (have start but not end)
    if (selectedRange.start && hoverDate && !selectedRange.end) {
      // The hover date could be before the start date
      const rangeStart = new Date(Math.min(selectedRange.start.getTime(), hoverDate.getTime()));
      const rangeEnd = new Date(Math.max(selectedRange.start.getTime(), hoverDate.getTime()));
      
      return date.getTime() > rangeStart.getTime() && date.getTime() < rangeEnd.getTime();
    }
    
    return date.getTime() > selectedRange.start.getTime() && date.getTime() < selectedRange.end.getTime();
  };

  const handleDateClick = (date: Date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Don't allow selection of dates in the past
    if (date < now) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Starting a new selection
      setSelectedRange({
        start: date,
        end: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2) // Default to 2 night stay
      });
      
      // Update booking context
      if (setBookingDetails) {
        setBookingDetails(prev => ({
          ...prev,
          dates: {
            checkIn: date,
            checkOut: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2)
          }
        }));
      }
      
    } else if (selectedRange.start && !selectedRange.end) {
      // Completing a selection
      // Ensure end date is after start date
      if (date > selectedRange.start) {
        setSelectedRange(prev => ({
          ...prev,
          end: date
        }));
        
        // Update booking context
        if (setBookingDetails) {
          setBookingDetails(prev => ({
            ...prev,
            dates: {
              checkIn: selectedRange.start,
              checkOut: date
            }
          }));
        }
      } else {
        // If clicked date is before start date, make it the new start and old start the end
        setSelectedRange({
          start: date,
          end: selectedRange.start
        });
        
        // Update booking context
        if (setBookingDetails) {
          setBookingDetails(prev => ({
            ...prev,
            dates: {
              checkIn: date,
              checkOut: selectedRange.start
            }
          }));
        }
      }
    }
  };

  const handleMouseEnter = (date: Date) => {
    setHoverDate(date);
  };

  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const monthData = getMonthData(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="relative">
      <div 
        className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 p-3 cursor-pointer"
        onClick={toggleCalendar}
      >
        <CalendarIcon className="mr-2 text-gray-500" size={20} />
        <div className="flex-grow">
          <div className="text-gray-800 dark:text-white">
            {formatDate(selectedRange.start)} - {formatDate(selectedRange.end)}
          </div>
        </div>
      </div>
      
      {showCalendar && (
        <div className="absolute mt-2 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-full md:w-auto min-w-[300px]">
          <div className="flex justify-between items-center mb-4">
            <button 
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={goToPrevMonth}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="font-semibold text-gray-800 dark:text-white">{monthName}</div>
            <button 
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={goToNextMonth}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-gray-500 dark:text-gray-400 text-xs font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {monthData.map((date, i) => {
              const isStart = isSelectionStart(date);
              const isEnd = isSelectionEnd(date);
              const inRange = isInRange(date);
              const isCurrentDay = isToday(date);
              const isDisabled = date < new Date() || isOtherMonth(date);
              
              return (
                <div 
                  key={i}
                  className={`
                    relative h-9 flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors
                    ${isDisabled ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    ${isStart || isEnd ? 'bg-teal-600 text-white hover:bg-teal-700' : ''}
                    ${inRange ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200' : ''}
                    ${isCurrentDay && !isStart && !isEnd ? 'font-bold' : ''}
                  `}
                  onClick={() => !isDisabled && handleDateClick(date)}
                  onMouseEnter={() => !isDisabled && handleMouseEnter(date)}
                  onMouseLeave={handleMouseLeave}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 flex justify-between">
            <button 
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setShowCalendar(false)}
            >
              Close
            </button>
            <button 
              className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300"
              onClick={() => setShowCalendar(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;