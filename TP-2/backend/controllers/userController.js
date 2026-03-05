const userModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  const role = req.query.role;
  const users = userModel.getAll(role);
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = userModel.getById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};

const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Les champs name et email sont requis",
    });
  }

  const existingUser = userModel.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Cet email est déjà utilisé par un autre utilisateur",
    });
  }

  const newUser = userModel.create({ name, email, role });
  res.status(201).json({
    success: true,
    data: newUser,
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = userModel.getById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé",
    });
  }

  if (req.body.email) {
    const existingUser = userModel.findByEmail(req.body.email, id);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà utilisé par un autre utilisateur",
      });
    }
  }

  const updatedUser = userModel.update(id, req.body);
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const removed = userModel.remove(id);

  if (!removed) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé",
    });
  }

  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
