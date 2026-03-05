const express = require("express");
const usersRouter = require("./routes/users");
const requestLogger = require("./middlewares/requestLogger");

const app = express();
const PORT = 3001;

// Bonus C — Middleware de logging (avant les routes)
app.use(requestLogger);

// Middleware pour parser le corps des requêtes JSON (POST, PUT)
app.use(express.json());

// Monter les routes users sous le préfixe /api/users
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
