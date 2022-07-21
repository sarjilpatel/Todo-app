import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, userReducer } from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
});

export default store;
