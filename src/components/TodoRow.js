import React, { useRef } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { ref, update } from "firebase/database";
import { db } from "../firebaseConfig";
import { useDataStore } from "../DataStore/DataStore";
function TodoRow({ content, deleteTask }) {
  const [{ user }] = useDataStore();
  const checkboxRef = useRef();
  const completeTask = (e, key) => {
    const todos = ref(db, "todo/" + user.user.uid + "/" + key);
    update(todos, { completed: checkboxRef.current.checked });
    //checkboxRef.current.checked = true;
  };

  return (
    <div className="todoContainer" key={content.key}>
      <div className="todoRow">
        <input
          type="checkbox"
          defaultChecked={content.completed ? true : false}
          onClick={(e) => completeTask(e, content.key)}
          ref={checkboxRef}
        />
        <div className="title">{content.title} </div>

        <div className="delete">
          <CloseIcon onClick={(e) => deleteTask(e, content.key)} />
        </div>
      </div>
      <div className="todoFooter">
        <div className="created">{content.created_at}</div>
      </div>
    </div>
  );
}

export default TodoRow;
