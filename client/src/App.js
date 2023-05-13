import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import BusinessProfile from "./pages/BusinessProfile";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";
import ProductCard from "./components/productCard";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import BusinessSignUp from "./pages/BusinessSignUp";
import ExploreBusiness from "./pages/ExploreBusiness";
import AddProduct from "./components/AddProduct";
// a comment
// import businessSignUp from "./components/BusinessSignUp";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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
          <Route path="/business/profile/:name" element={<BusinessProfile />} />
          <Route path="/business/:name" element={<ExploreBusiness />} />
          <Route path="/product/:productId" element={<ProductCard />} />
          <Route path="/newbusiness/addproduct" element={<AddProduct />} />
          <Route path="/newbusiness" element={<BusinessSignUp />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
