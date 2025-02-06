import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MovieDetails/:id" element={<MovieDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
