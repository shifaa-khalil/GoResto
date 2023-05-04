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
import NoAccess from "./pages/noAccess";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      // setIsAuthenticated(true);
      if (role == "admin") {
        setIsAdmin(true);
        setIsLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading)
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/setup"
          element={
            <Setup />
            // isAuthenticated ? <Setup /> : <Navigate to="/signin" replace />
          }
        />
        {/* <Route
          path="/pending"
          element={
            isAuthenticated ? <Pending /> : <Navigate to="/signin" replace />
          }
        /> */}
        {/* <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/chatsReviews"
          element={
            isAuthenticated ? (
              <ChatsReviews />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        /> */}
        {/* <Route
          path="/reservations"
          element={
            isAuthenticated ? (
              <Reservations />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/menu"
          element={
            isAuthenticated ? <Menu /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? <About /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/requests"
          element={
            isAuthenticated ? <Requests /> : <Navigate to="/signin" replace />
          }
        /> */}
        <Route path="/noAccess" element={<NoAccess />} />
        <Route
          path="/restaurants"
          element={
            isAdmin ? <Restaurants /> : <Navigate to="/noAccess" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
