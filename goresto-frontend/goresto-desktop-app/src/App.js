import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/landing";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Setup from "./pages/setup";
import Pending from "./pages/pending";
import Dashboard from "./pages/dashboard";
import ChatsReviews from "./pages/chatsReviews";
import Reservations from "./pages/reservations";
import Menu from "./pages/menu";
import About from "./pages/about";
import Requests from "./pages/admin/requests";
import Restaurants from "./pages/admin/restaurants";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // setIsLoading(false);
    }
  }, []);

  // if (isLoading) return <h1>loading</h1>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/setup"
          element={
            isAuthenticated ? <Setup /> : <Navigate to="/signin" replace />
          }
        />
        <Route path="/pending" element={<Pending />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatsReviews" element={<ChatsReviews />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
