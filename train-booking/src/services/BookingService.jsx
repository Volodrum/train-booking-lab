export const BookingService = {
  saveBooking: (bookingData) => {
    return new Promise((resolve) => {
      // Імітуємо затримку мережі (опціонально, для реалістичності)
      setTimeout(() => {
        const existingBookings = JSON.parse(localStorage.getItem('train_bookings')) || [];
        existingBookings.push({
          ...bookingData,
          id: Date.now(), // Генеруємо унікальний ID для бронювання
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('train_bookings', JSON.stringify(existingBookings));
        resolve({ success: true });
      }, 800);
    });
  }
};