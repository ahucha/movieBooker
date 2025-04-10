import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://moviebooker-zt7n.onrender.com';

type Movie = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
};

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [movieId, setMovieId] = useState('');
  const [date, setDate] = useState('');

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/movies?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error('Erreur lors de la récupération des films.');
    }
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/reservations`,
        {
          movieId: parseInt(movieId),
          startTime: new Date(date).toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Réservation effectuée avec succès.');
      setMovieId('');
      setDate('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de la réservation.');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Films disponibles</h1>

      {/* Formulaire de réservation */}
      <form
        onSubmit={handleReservation}
        className="bg-white shadow p-4 rounded mb-10 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">Réserver un film</h2>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            placeholder="ID du film"
            className="border border-gray-300 px-4 py-2 rounded"
            required
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Réserver
          </button>
        </div>
      </form>

      {/* Grille de films */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow text-center">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="mx-auto mb-2 rounded"
            />
            <h3 className="font-bold">{movie.title}</h3>
            <p className="text-gray-500 text-sm">ID : {movie.id}</p>
            <p className="text-gray-600">Note : {movie.vote_average}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Précédent
        </button>
        <span className="text-gray-700 font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
