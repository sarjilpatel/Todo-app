import { StylesProvider } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import "./Todo.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditModal from "../../EditModal/EditModal";
import { UserState } from "../../../context/UserContext";

function Todo({ todo }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(todo.todo);
  const { setLoading } = UserState();

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`/api/v1/todos/${todo._id}`, { todo: input });
    setOpen(false);
    setLoading(false);
  };

  const deleteTodo = async (e) => {
    setLoading(true);
    console.log("delete");
    await axios.delete(`/api/v1/todos/${todo._id}`);
    setLoading(false);
  };

  const date = new Date(todo.updatedAt);

  const formatedDate =
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  return (
    <StylesProvider>
      <EditModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        updateHandler={updateTodo}
        input={input}
        setInput={setInput}
        updateName="Todo"
      />
      <div className="todo__item">
        <div className="list__item">
          <h5>{todo.todo}</h5>
          <p>{formatedDate}</p>
        </div>
        <div className="todo__buttons">
          <EditIcon
            className="todo__icon edit__icon"
            onClick={() => setOpen(true)}
            style={{ fontSize: 30 }}
          />

          <DeleteForeverIcon
            onClick={deleteTodo}
            className="todo__icon delete__icon"
            style={{ fontSize: 30 }}
          />
        </div>
      </div>
    </StylesProvider>
  );
}

export default Todo;
