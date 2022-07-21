import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import { UserState } from "./context/UserContext";

function App() {
  const {
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    todos,
    theme,
    setTodos,
  } = UserState();

  const loadUser = async () => {
    try {
      setLoading(true);
      await axios
        .get("/api/v1/me")
        .then((res) => {
          setUser(res.data.user);
          setTodos(res.data.user.todos);
          setLoading(false);
          res.data.success && setIsAuthenticated(true);
        })
        .catch((e) => {
          !e.response.data.success && setIsAuthenticated(false);
        });
    } catch (error) {
      console.log(error.response.data.success);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, todos, theme]);

  return (
    <div className="App">
      {isAuthenticated && <Header />}
      {loading && <LinearProgress />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={isAuthenticated ? <Home /> : <Register />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
