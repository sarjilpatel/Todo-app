import React from "react";
import { UserState } from "../../context/UserContext";
import Todo from "./Todo/Todo";
import "./Todos.css";

function Todos() {
  const { todos, theme } = UserState();
  return (
    <ul className="todos">
      {todos.map((todo) => {
        return <Todo key={todo._id} todo={todo} />;
      })}
    </ul>
  );
}

export default Todos;
