import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./component/AppHeader"; // Import AppHeader

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <AppHeader>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </AppHeader>
    </Router>
  );
}

export default App;
