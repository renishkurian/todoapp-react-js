import React, { useRef, useEffect } from "react";
import "./resources/css/DashBoard.css";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import "./resources/css/Todo.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TodoRow from "./TodoRow";
import { useDataStore } from "../DataStore/DataStore";
import { ref, set, onValue, push, onChildAdded } from "firebase/database";
import { authConf, db } from "../firebaseConfig";
import ToDoBody from "./ToDoBody";
function Todo() {
  const [{ user }] = useDataStore();
  const inputRef = useRef();
  const todos = ref(db, "todo/" + user.user.uid);
  const addTodo = (e) => {
    const date = new Date();
    if (inputRef.current.value !== "") {
      push(ref(db, "todo/" + user.user.uid), {
        title: inputRef.current.value,
        created_at: date.toLocaleString(),
        completed: false,
      });
    }
    inputRef.current.value = "";
  };

  return (
    <div className="todo_wrapper">
      <div className="todo-header">
        <InputBase
          // onKeyPress={(e) => addTodo(e)}
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add New Item "
          inputProps={{ "aria-label": "Add new" }}
        />
        <IconButton
          onClick={addTodo}
          type="submit"
          sx={{ p: "10px" }}
          aria-label="submit"
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className="to-do-list">
        <ToDoBody />
        <div className="todo-footer">
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}

export default Todo;
