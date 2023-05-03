import "./App.css";
import BusinessProfile from "./components/BusinessProfile";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/business" element={<BusinessProfile />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
