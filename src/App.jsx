// App.jsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AppHeader from "./component/AppHeader";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";

function App() {
  return (
    <Router>
      <AppHeader>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} /> {/* Added route for Post component */}
          <Route path="/login" element={<Login />} /> {/* Corrected path to lowercase */}
          <Route path="/signup" element={<Signup />} /> {/* Corrected path to lowercase */}
         
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home for unknown routes */}
        </Routes>
      </AppHeader>
    </Router>
  );
}

export default App;