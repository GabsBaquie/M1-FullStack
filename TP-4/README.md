# TP 2 — Backend Fundamentals

API REST pour gérer une liste d'utilisateurs (stockage en mémoire).

## Structure du projet

```
backend/
├── models/
│   └── userModel.js      # Logique d'accès aux données
├── controllers/
│   └── userController.js # Traitement des requêtes HTTP
├── routes/
│   └── users.js          # Déclaration des routes
├── middlewares/
│   └── requestLogger.js  # Bonus : logging des requêtes
├── data/
│   └── users.js          # Données initiales
└── server.js
```

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

Le serveur écoute sur `http://localhost:3001`

## Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/users` | Liste tous les utilisateurs |
| GET | `/api/users?role=admin` | Filtre par rôle (Bonus) |
| GET | `/api/users/:id` | Récupère un utilisateur par id |
| POST | `/api/users` | Crée un nouvel utilisateur |
| PUT | `/api/users/:id` | Met à jour un utilisateur |
| DELETE | `/api/users/:id` | Supprime un utilisateur |

## Tests avec Postman

Importez la collection : `postman/TP2_Users_API.postman_collection.json`

1. **Scénario complet** : GET → POST → GET/:id → PUT → GET → DELETE → GET/:id (404)
2. **Cas d'erreur** : POST sans name/email (400), GET/PUT/DELETE avec id inexistant (404)

## Bonus implémentés

- **A** : Filtrage par rôle `?role=admin`
- **B** : Validation email unique (409 Conflict si doublon)
- **C** : Middleware de logging `[date] METHOD path - status - duration`

