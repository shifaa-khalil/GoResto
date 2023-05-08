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
import Chats from "./pages/chats";
import Reviews from "./pages/reviews";
import Reservations from "./pages/reservations";
import Menu from "./pages/menu";
import About from "./pages/about";
import Requests from "./pages/admin/requests";
import Restaurants from "./pages/admin/restaurants";
import Users from "./pages/admin/users";
import Inquiries from "./pages/admin/inquiries";
import NoAccess from "./pages/noAccess";
import NotFound from "./pages/notFound";
import Inquiry from "./pages/inquiry";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [hasRestaurant, setHasRestaurant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const restaurant = localStorage.getItem("restaurant");

    // if (response.data.restaurant == null) navigate("/setup");
    // else if (response.data.restaurant.approved === 0) navigate("/pending");
    // else navigate("/dashboard");

    if (token) {
      setIsAuthenticated(true);
      if (role && role == "admin") {
        setIsAdmin(true);
        // setIsManager(false);
        setIsLoading(false);
      }
      if (role && role == "manager") {
        setIsManager(true);
        // setIsAdmin(false);
        if (restaurant !== null) {
          setHasRestaurant(true);
          setIsLoading(false);
        }
      }
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (isLoading)
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/noAccess" element={<NoAccess />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/setup"
          element={
            isAuthenticated ? (
              <Setup />
            ) : (
              // isManager ? (
              //   <Setup />
              // ) : (
              //   <Navigate to="/noAccess" replace />
              // )
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/pending"
          element={
            isAuthenticated ? (
              <Pending />
            ) : (
              // isManager ? (
              //   <Pending />
              // ) : (
              //   <Navigate to="/noAccess" replace />
              // )
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/menu"
          element={
            isAuthenticated ? (
              <Menu />
            ) : (
              //   isManager ? (
              //     hasRestaurant ? (
              //       <Menu />
              //     ) : (
              //       <Navigate to="/setup" replace />
              //     )
              //   ) : (
              //     <Navigate to="/noAccess" replace />
              //   )
              // )
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              // isManager ? (
              //   hasRestaurant ? (
              //     <Dashboard />
              //   ) : (
              //     <Navigate to="/setup" replace />
              //   )
              // ) : (
              //   <Navigate to="/noAccess" replace />
              // )
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/reviews"
          element={
            isAuthenticated ? (
              isManager ? (
                hasRestaurant ? (
                  <Reviews />
                ) : (
                  <Navigate to="/setup" replace />
                )
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/reservations"
          element={
            isAuthenticated ? (
              isManager ? (
                <Reservations />
              ) : (
                // hasRestaurant ? (
                //   <Reservations />
                // ) : (
                //   <Navigate to="/setup" replace />
                // )
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/chats"
          element={
            isAuthenticated ? (
              isManager ? (
                hasRestaurant ? (
                  <Chats />
                ) : (
                  <Navigate to="/setup" replace />
                )
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              isManager ? (
                hasRestaurant ? (
                  <About />
                ) : (
                  <Navigate to="/setup" replace />
                )
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/inquiry"
          element={
            isAuthenticated ? (
              isManager ? (
                hasRestaurant ? (
                  <Inquiry />
                ) : (
                  <Navigate to="/setup" replace />
                )
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/requests"
          element={
            isAuthenticated ? (
              <Requests />
            ) : (
              // isAdmin ? (
              //   <Requests />
              // )
              // : (
              //   <Navigate to="/noAccess" replace />
              // )
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/restaurants"
          element={
            isAuthenticated ? (
              isAdmin ? (
                <Restaurants />
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              isAdmin ? (
                <Users />
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/inquiries"
          element={
            isAuthenticated ? (
              isAdmin ? (
                <Inquiries />
              ) : (
                <Navigate to="/noAccess" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
