import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./component/AppHeader"; // Import AppHeader


import SignUp from "./component/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      {/* BrowserRouter ko sirf ek baar wrap karna hai */}
      <AppHeader>
      
       
        <Routes>
        <Route path="/" element={<Home />} />
         
          <Route path="/profile" element={<Profile/>} />
         
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<SignUp />} />
        </Routes>
      </AppHeader>
    </Router>
  );
}

export default App;
