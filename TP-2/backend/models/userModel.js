const users = require("../data/users");

const getAll = (roleFilter) => {
  if (roleFilter) {
    return users.filter((u) => u.role === roleFilter);
  }
  return [...users];
};

const getById = (id) => {
  return users.find((u) => u.id === id);
};

const create = (data) => {
  const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
  const newUser = {
    id: maxId + 1,
    name: data.name,
    email: data.email,
    role: data.role || "user",
    createdAt: new Date().toISOString().split("T")[0],
  };
  users.push(newUser);
  return newUser;
};

const update = (id, data) => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return null;

  const allowedFields = ["name", "email", "role"];
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      users[userIndex][field] = data[field];
    }
  });
  return users[userIndex];
};

const remove = (id) => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return false;
  users.splice(userIndex, 1);
  return true;
};

const findByEmail = (email, excludeId = null) => {
  return users.find((u) => u.email === email && u.id !== excludeId);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  findByEmail,
};
