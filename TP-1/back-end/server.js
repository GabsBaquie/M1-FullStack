const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get("/api/movies", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Inception",
      year: 2010,
      genre: "Science-Fiction",
      rating: 8.8,
    },
    {
      id: 2,
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      rating: 9.0,
    },
    {
      id: 3,
      title: "Interstellar",
      year: 2014,
      genre: "Science-Fiction",
      rating: 8.6,
    },
    { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 8.9 },
    {
      id: 5,
      title: "The Matrix",
      year: 1999,
      genre: "Science-Fiction",
      rating: 8.7,
    },
  ]);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});

app.post("/api/movies", (req, res) => {
  const movie = {
    id: movies.length + 1,
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
    rating: req.body.rating,
  };
  movies.push(movie);
  res.status(201).json(movie);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
