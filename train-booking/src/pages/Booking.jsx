import { useParams, Link } from 'react-router-dom';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const { trainId } = useParams();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ color: '#3182ce', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← Повернутися до списку рейсів
      </Link>
      
      <h1 style={{ marginBottom: '30px' }}>Бронювання на рейс {trainId}</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div>
          <WagonSelector />
          <SeatMap />
        </div>
        <div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default Booking;