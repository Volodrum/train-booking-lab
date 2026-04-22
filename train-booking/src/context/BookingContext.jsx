import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Імітація вже заброньованих місць (в реальності це приходило б з API)
  const [bookedSeats, setBookedSeats] = useState({
    1: [2, 5, 13, 24], // У вагоні 1 зайняті ці місця
    2: [10, 11, 12],   // У вагоні 2...
    3: []
  });

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) // Якщо місце вже обране - знімаємо виділення
        : [...prev, seatId]                // Якщо ні - додаємо
    );
  };

  const clearSelection = () => setSelectedSeats([]);

  return (
    <BookingContext.Provider value={{ 
      selectedWagon, 
      setSelectedWagon, 
      selectedSeats, 
      toggleSeat, 
      bookedSeats,
      setBookedSeats,
      clearSelection
    }}>
      {children}
    </BookingContext.Provider>
  );
};