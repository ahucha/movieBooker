# 🎬 MoviieBooker

Une application web complète permettant de :
- S'inscrire et se connecter
- Consulter une liste de films récupérés via **TMDB**
- Réserver un film à une date donnée
- Visualiser et supprimer ses réservations

---

## 🔗 Accès à l'application

- 🖥️ Frontend : [https://movie-booker-front.onrender.com](https://movie-booker-front.onrender.com)
- 🛠️ Backend API (NestJS) : [https://moviebooker-zt7n.onrender.com](https://moviebooker-zt7n.onrender.com)

---

## 📌 Fonctionnalités

### 🔐 Authentification
- Création de compte avec email + mot de passe
- Connexion et gestion du token JWT
- Protection des routes avec authentification

### 🎥 Films
- Liste paginée de films (API TMDB)
- Affichage des détails de chaque film
- Système de réservation avec date personnalisée

### 📅 Réservations
- Réservation possible avec règle : **minimum 2h entre chaque film**
- Consultation des réservations
- Suppression possible

---

## 🧪 Tester l’API (Swagger)

📚 Documentation Swagger intégrée  
→ Accès : [https://moviebooker-zt7n.onrender.com/api](https://moviebooker-zt7n.onrender.com/api)

---

## 🛠️ Tech Stack

- **Frontend** : React + Vite + TailwindCSS
- **Backend** : NestJS + PostgreSQL + TypeORM
- **Authentification** : JWT
- **API Films** : [TMDB](https://www.themoviedb.org/)
- **Déploiement** : Render

---