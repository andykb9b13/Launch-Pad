import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import BusinessProfile from "./pages/BusinessProfile";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";
import ProductCard from "./components/productCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

// import businessSignUp from "./components/BusinessSignUp";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  // THis is so that we can see our cache in action
  connectToDevTools: true,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/business" element={<BusinessProfile />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/business/:name" element={<BusinessProfile />} />
          <Route path="/product/:productId" element={<ProductCard />} />
          {/* <Route path="/newbusiness" element={<businessSignUp />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
