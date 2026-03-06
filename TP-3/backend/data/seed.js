require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/userModel");

const seedUsers = [
  {
    name: "Alice Martin",
    email: "alice@example.com",
    role: "admin",
    createdAt: new Date("2024-01-15"),
  },
  {
    name: "Bob Dupont",
    email: "bob@example.com",
    role: "user",
    createdAt: new Date("2024-01-16"),
  },
  {
    name: "Claire Bernard",
    email: "claire@example.com",
    role: "user",
    createdAt: new Date("2024-01-17"),
  },
];

const runSeed = async () => {
  try {
    await connectDB();

    const count = await User.countDocuments();
    if (count > 0) {
      console.log("La collection contient déjà des utilisateurs. Seed ignoré.");
      await mongoose.connection.close();
      process.exit(0);
      return;
    }

    await User.insertMany(seedUsers);
    console.log("3 utilisateurs de test insérés avec succès.");
  } catch (error) {
    console.error("Erreur lors du seed :", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

runSeed();
