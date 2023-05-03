import "./App.css";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Homepage />
    </Router>
  );
}

export default App;
