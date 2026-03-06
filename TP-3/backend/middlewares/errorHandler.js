/**
 * Middleware d'erreurs global (Bonus C)
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message || "Données invalides",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Cet email est déjà utilisé par un autre utilisateur",
    });
  }

  res.status(500).json({
    success: false,
    message: "Erreur serveur",
  });
};

module.exports = errorHandler;
