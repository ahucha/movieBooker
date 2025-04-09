import { Routes, Route } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import Movies from './pages/Movies';
import Reservations from './pages/Reservations';
import Header from './components/Header';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="px-4">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          {isAuthenticated && (
            <>
              <Route path="/movies" element={<Movies />} />
              <Route path="/reservations" element={<Reservations />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;