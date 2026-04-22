import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import styles from './SeatMap.module.css';

const SeatMap = () => {
  const { selectedWagon, selectedSeats, toggleSeat, bookedSeats } = useContext(BookingContext);
  
  // Генеруємо 36 місць (стандартне купе)
  const totalSeats = 36;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  const currentWagonBooked = bookedSeats[selectedWagon] || [];

  return (
    <div className={styles.wagonContainer}>
      <div className={styles.trainHead}>Вперед</div>
      <div className={styles.seatGrid}>
        {seats.map(seat => {
          const isBooked = currentWagonBooked.includes(seat);
          const isSelected = selectedSeats.includes(seat);
          
          let seatClass = styles.free;
          if (isBooked) seatClass = styles.booked;
          else if (isSelected) seatClass = styles.selected;

          return (
            <button
              key={seat}
              disabled={isBooked}
              className={`${styles.seat} ${seatClass}`}
              onClick={() => toggleSeat(seat)}
              title={isBooked ? 'Місце зайняте' : `Місце ${seat}`}
            >
              {seat}
            </button>
          );
        })}
      </div>
      <div className={styles.legend}>
        <span className={`${styles.legendItem} ${styles.free}`}>Вільні</span>
        <span className={`${styles.legendItem} ${styles.selected}`}>Обрані</span>
        <span className={`${styles.legendItem} ${styles.booked}`}>Зайняті</span>
      </div>
    </div>
  );
};

export default SeatMap;