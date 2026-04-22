import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookingContext } from '../context/BookingContext';
import { BookingService } from '../services/BookingService';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { selectedWagon, selectedSeats, clearSelection, setBookedSeats } = useContext(BookingContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      toast.warning('Будь ласка, виберіть хоча б одне місце на схемі вагона.');
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      trainId,
      wagon: selectedWagon,
      seats: selectedSeats,
      passenger: formData
    };

    try {
      await BookingService.saveBooking(bookingData);
      
      // Оновлюємо локальний стан "зайнятих" місць, щоб вони одразу стали червоними
      setBookedSeats(prev => ({
        ...prev,
        [selectedWagon]: [...(prev[selectedWagon] || []), ...selectedSeats]
      }));

      toast.success('Квитки успішно заброньовано!');
      clearSelection();
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      
      // Опціонально: перенаправлення на головну через кілька секунд
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      toast.error('Сталася помилка при бронюванні.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Оформлення квитків</h2>
      
      <div className={styles.summary}>
        <p><strong>Вагон:</strong> {selectedWagon}</p>
        <p><strong>Обрані місця:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Не обрано'}</p>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="firstName">Ім'я</label>
        <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="lastName">Прізвище</label>
        <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Номер телефону</label>
        <input type="tel" id="phone" name="phone" required pattern="[0-9]{10,12}" placeholder="380XXXXXXXXX" value={formData.phone} onChange={handleChange} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting || selectedSeats.length === 0}>
        {isSubmitting ? 'Обробка...' : 'Підтвердити бронювання'}
      </button>
    </form>
  );
};

export default BookingForm;