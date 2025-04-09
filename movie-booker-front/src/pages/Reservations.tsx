import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

interface Reservation {
  id: number;
  movieId: number;
  startTime: string;
}

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReservations();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Mes Réservations</h1>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-gray-500">Aucune réservation pour le moment.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Film ID : {r.movieId}</p>
                <p className="text-gray-600">
                  Heure : {new Date(r.startTime).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(r.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Annuler
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}