import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./component/AppHeader"; // Import AppHeader
import Profile from "./component/Profile"; // Import Profile Component
import Home from "./component/Home"; // Import Home Component
import PageNotFound from "./component/PageNotFound";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
function App() {
  return (
    <Router>
      <AppHeader>
        {" "}
        {/* AppHeader will remain common across all pages */}
        <Routes>
          {/* Define Routes with correct paths */}
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/profile" element={<Profile />} />{" "}
          {/* Profile page route */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppHeader>
    </Router>
  );
}

export default App;
