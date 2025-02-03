import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Add Navigate for redirection
import AppHeader from "./component/AppHeader";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";

function App() {
  const isAuthenticated = false; // Yeh aap apni authentication state ke saath replace kar sakte hain

  return (
    <Router>
      <AppHeader>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/Login" />} 
          />
           <Route 
            path="/profile" 
            element={isAuthenticated ? <Post /> : <Navigate to="/Login" />} 
          />
          <Route path="Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </AppHeader>
    </Router>
  );
}

export default App;
