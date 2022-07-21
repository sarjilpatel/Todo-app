import axios from "axios";
import React, { useState } from "react";
import "./AddForm.css";
import { UserState } from "../../context/UserContext";

const AddForm = () => {
  const [input, setInput] = useState("");
  const { setLoading } = UserState();

  const addTodo = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .post("/api/v1/todos", { todo: input })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setInput("");
    setLoading(false);
  };
  return (
    <div className="addfrom">
      <form className="header__input-form">
        <input
          value={input}
          placeholder="Enter todo ...."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          color="primary"
          disabled={!input}
          onClick={addTodo}
          variant="contained"
          type="submit"
        >
          ADD TODO
        </button>
      </form>
    </div>
  );
};

export default AddForm;
