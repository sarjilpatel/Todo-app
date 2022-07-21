import { Typography, Button, Avatar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserState } from "../../context/UserContext";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const { setLoading, setUser, setIsAuthenticated, setTodos } = UserState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = function () {
      setAvatar(Reader.result); // readyState will be 2
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios
        .post(
          "/api/v1/register",
          { name, email, password, avatar },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          displaySuccessToast("Register successfully");
        })
        .catch((error) => {
          displayErrorToast(error.response.data.message);
        });

      setUser(data.user);
      setTodos(data.user.todos);
      setLoading(false);
      setIsAuthenticated(true);
      console.log(data.user);
    } catch (error) {}
  };

  const displaySuccessToast = (message) => {
    toast.success(message);
  };

  const displayErrorToast = (message) => {
    toast.error(message);
  };
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Register
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input
          className="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button disabled={false} type="submit">
          Sign Up
        </Button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Register;
