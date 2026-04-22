import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Обов'язково імпортувати стилі
import Home from './pages/Home';
import Booking from './pages/Booking';

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<Booking />} />
      </Routes>
      
      {/* Контейнер для спливаючих повідомлень */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;