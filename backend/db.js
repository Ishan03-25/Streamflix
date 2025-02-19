const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            serverSelectionTimeoutMS: 50000,
            socketTimeoutMS: 45000,
        });
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Error in conneccting to database: ", error);
    }
}


const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
});

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  realeased_Date: { type: Date, required: true },
  categorgy: { type: String, required: true },
  cast: { type: [String], required: true, trim: true },
  castImageURL: { type: [String] },
  rating: { type: Number, required: true, min: 0, max: 10 },
  ImageURL: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  plot_embedding: {type: [Number]},
});

const User = mongoose.model("users", userSchema);
const movie = mongoose.model("embedded_movies", movieSchema);

module.exports = { connectDB, movie, User };