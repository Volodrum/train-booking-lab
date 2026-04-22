import { Link } from 'react-router-dom';
import styles from './TrainCard.module.css';

const TrainCard = ({ train }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.trainNumber}>{train.number}</span>
        <h3 className={styles.route}>{train.route.from} — {train.route.to}</h3>
      </div>
      
      <div className={styles.details}>
        <div className={styles.timeBlock}>
          <span className={styles.time}>{formatTime(train.departure)}</span>
          <span className={styles.city}>{train.route.from}</span>
        </div>
        
        <div className={styles.durationBlock}>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.line}></div>
        </div>

        <div className={styles.timeBlock}>
          <span className={styles.time}>{formatTime(train.arrival)}</span>
          <span className={styles.city}>{train.route.to}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>від {train.price} ₴</span>
        <Link to={`/booking/${train.id}`} className={styles.bookButton}>
          Вибрати місця
        </Link>
      </div>
    </div>
  );
};

export default TrainCard;