import "./App.css";
import BusinessProfile from "./pages/BusinessProfile";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import BusinessSignUp from "./components/BusinessSignUp";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/business" element={<BusinessProfile />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/newbusiness" element={<businessSignUp />} />
      </Routes>
    </Router>
  );
}
