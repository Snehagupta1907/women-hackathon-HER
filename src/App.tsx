import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SnakesGame from "./SnakesGame";
import Leaderboard from "./leaderBoard/LeaderBoard";
// import Dashboard from "./Dashboard/Dashboard";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <Router>
      <div id="navbar">
        <h1>Snake Game</h1>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" >Home</Link>
          <Link
            to="/leaderboard"
           
          >
            Leaderboard
          </Link>
          {/* <Link to="/dashboard">Dashboard</Link> */}
          <ConnectButton accountStatus="avatar" chainStatus="icon" />
        </nav>
      </div>
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<SnakesGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}
