import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://moviebooker-zt7n.onrender.com';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (res.data.access_token) {
          localStorage.setItem('token', res.data.access_token);
          navigate('/movies');
        } else {
          alert("Connexion réussie, mais aucun token reçu.");
        }
      } else {
        await axios.post(`${API_URL}/auth/register`, { email, password });
        alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Connexion' : 'Inscription'}</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </form>
    </div>
  );
}