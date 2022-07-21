import React from "react";
import AddForm from "../AddForm/AddForm";
import Todos from "../Todos/Todos";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <AddForm />
      <Todos />
    </div>
  );
};

export default Home;
