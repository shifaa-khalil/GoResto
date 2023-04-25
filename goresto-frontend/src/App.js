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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
        <Route path="/pending" element={<pending />} />

        {/* <Route path="/admin" element={<UserList />} />
      <Route path="/dashboard" element={<dashboard />} />
      <Route path="/chatsReviews" element={<chatsReviews />} />
      <Route path="/reservations" element={<reservations />} />
      <Route path="/reservations" element={<reservations />} />
      <Route path="/about" element={<about />} />
      <Route path="/menu" element={<menu />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
