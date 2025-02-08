require("dotenv").config();

const express = require("express");
const cors = require("cors");
const movieRouter = require("./routes/movie/movie");
const userRouter = require("./routes/user/user");
const { connectDB } = require("./db");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/movies", movieRouter);
app.use("/users", userRouter);

app.listen(port, () => {
    console.log("App is successfully connected to port:", port);
});