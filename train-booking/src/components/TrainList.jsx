import { useState } from 'react';
import TrainCard from './TrainCard';
import { trains } from '../data/trains';
import styles from './TrainList.module.css';

const TrainList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrains = trains.filter(train => {
    const query = searchQuery.toLowerCase();
    return (
      train.route.from.toLowerCase().includes(query) ||
      train.route.to.toLowerCase().includes(query) ||
      train.number.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder="Звідки, куди або номер потяга..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.grid}>
        {filteredTrains.length > 0 ? (
          filteredTrains.map(train => (
            <TrainCard key={train.id} train={train} />
          ))
        ) : (
          <div className={styles.noResults}>
            За вашим запитом потягів не знайдено.
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainList;