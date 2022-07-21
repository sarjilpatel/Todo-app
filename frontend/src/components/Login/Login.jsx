import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserState } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoading, setUser, setIsAuthenticated, setTodos } = UserState();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(data.user);
      setTodos(data.user.todos);
      setLoading(false);
      setIsAuthenticated(true);
      console.log(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Login
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
