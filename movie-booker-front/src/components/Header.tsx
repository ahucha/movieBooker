import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-white shadow p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🎬 Movie Booker</h1>
        <nav className="space-x-4">
          {token ? (
            <>
              <Link to="/movies" className="text-blue-600 hover:underline">Films</Link>
              <Link to="/reservations" className="text-blue-600 hover:underline">Réservations</Link>
              <button onClick={handleLogout} className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Déconnexion</button>
            </>
          ) : (
            <Link to="/" className="text-blue-600 hover:underline">Connexion</Link>
          )}
        </nav>
      </div>
    </header>
  );
}