import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";

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
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />} />

        {/* <Route path="/admin" element={<UserList />} />
         */}
      </Routes>
    </Router>
  );
}

export default App;
