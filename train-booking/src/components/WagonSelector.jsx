import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import styles from './WagonSelector.module.css';

const WagonSelector = () => {
  const { selectedWagon, setSelectedWagon, clearSelection } = useContext(BookingContext);
  const wagons = [1, 2, 3]; // Доступні вагони

  const handleWagonChange = (wagonNum) => {
    setSelectedWagon(wagonNum);
    clearSelection(); // Очищаємо обрані місця при зміні вагона
  };

  return (
    <div className={styles.selectorContainer}>
      <h3>Виберіть вагон:</h3>
      <div className={styles.wagonList}>
        {wagons.map(num => (
          <button
            key={num}
            className={`${styles.wagonBtn} ${selectedWagon === num ? styles.active : ''}`}
            onClick={() => handleWagonChange(num)}
          >
            Вагон {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WagonSelector;