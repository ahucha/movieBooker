# 🎬 Movie Booker – API NestJS

API pour gérer l'inscription, la connexion, et la réservation de films avec vérification de conflits horaires.

---

## 🛠️ Stack

- NestJS
- PostgreSQL + TypeORM
- JWT Auth
- TMDB API
- Swagger

---

## ⚙️ Installation

```bash
npm install
```

Créer un fichier `.env` à la racine (voir `.env.example` fourni) :

```env
cp .env.example .env
```

Lancer l'app :

```bash
npm run start:dev
```

---

## 📚 Endpoints

Swagger : [http://localhost:3000/api](http://localhost:3000/api)

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Reservations (auth requise)
- `POST /reservations`
- `GET /reservations`
- `DELETE /reservations/:id`

⏱️ Règle : Un film dure 2h. Pas de chevauchement entre deux réservations.

---

## ☁️ Déploiement (Render)

Tu peux définir tes variables d'environnement directement dans Render :

- `POSTGRES_*`
- `JWT_SECRET`
- `TMDB_API_KEY`

Et exposer ton API à l'adresse :

```txt
https://<ton-projet>.onrender.com/api
```
