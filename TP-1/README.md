# fullstack-project

Projet fullstack : back-end (Node.js + Express) + front-end (React + Vite).

## Arborescence

```
/fullstack-project
├── back-end/
│   └── server.js
├── front-end/
│   └── src/
│       └── App.js
├── README.md
└── .gitignore
```

## Installation

### Option 1 : Lancer front et back ensemble (recommandé)

```bash
# À la racine du projet
npm install
npm run dev
```

Cela démarre :
- **Back-end** sur http://localhost:5001
- **Front-end** sur http://localhost:5173 (Vite)

### Option 2 : Installation complète (première fois)

```bash
npm run install:all
npm run dev
```

### Option 3 : Lancer séparément

**Back-end :**
```bash
cd back-end
npm install
npm start
```
→ http://localhost:5001

**Front-end :**
```bash
cd front-end
npm install
npm run dev
```
→ http://localhost:5173

## Test global

- **Back-end** : http://localhost:5001/api/movies
- **Front-end** : http://localhost:5173
- Architecture fonctionnelle : front et back communiquent via l'API.
