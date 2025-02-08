const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../../db");
// const { app, JWT_SECRET, User } = require("../../auth");
const { signupSchema, signinSchema } = require("../../types");

const router = express.Router();
const JWT_SECRET = process.env.AUTH_JWT_SECRET // Use environment variables in production

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const parsepayload = signupSchema.safeParse(req.body);

  if (!parsepayload.success) {
    console.log("parse error");
    return res.status(411).json({ msg: "Invalid Inputs" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username, email });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to database
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(200).json({
      message: "User signed up successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const parsepayload = signinSchema.safeParse(req.body);

  if (!parsepayload.success) {
    console.log("parse error");
    return res.status(411).json({msg: "Invalid Input"});
  }

  try {
    // Find user in the database
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // Generate a JWT token
    if (!JWT_SECRET){
        console.log("JWT Secret is missing!");
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in signin route");
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.get("/verify-token", async (req, res) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  try {
    // Verify the token
    const decodedData = jwt.verify(token, JWT_SECRET);

    // Find the user in the database
    const foundUser = await User.findOne({ username: decodedData.username });
    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Respond with user details (excluding the password)
    res.json({
      username: foundUser.username,
      email: foundUser.email
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
})

// Get User Info (Protected Route)
// router.get("/me", async (req, res) => {
//   const token = req.headers.token;

//   if (!token) {
//     return res.status(401).json({
//       message: "Token not provided",
//     });
//   }

//   try {
//     // Verify the token
//     const decodedData = jwt.verify(token, JWT_SECRET);

//     // Find the user in the database
//     const foundUser = await User.findOne({ username: decodedData.username });
//     if (!foundUser) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // Respond with user details (excluding the password)
//     res.json({
//       username: foundUser.username,
//       email: foundUser.email
//     });
//   } catch (error) {
//     res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// });

module.exports = router;
