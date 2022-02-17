import React, { useEffect } from "react";
import { ref, onChildAdded, remove } from "firebase/database";
import { db } from "../firebaseConfig";
import { useDataStore } from "../DataStore/DataStore";
import TodoRow from "./TodoRow";
function ToDoBody() {
  const [{ user, todo, search }, dispatch] = useDataStore();
  let allTask = todo.filter((item) => {
    // console.log(useDataStore);
    return item.title.indexOf(search) !== -1;
  });

  const todos = ref(db, "todo/" + user.user.uid);
  useEffect(() => {
    onChildAdded(todos, (snapshot) => {
      // console.log(snapshot.key);
      const firebaseData = snapshot.val();
      const data = {
        key: snapshot.key,
        title: firebaseData.title,
        created_at: firebaseData.created_at,
        completed: firebaseData.completed,
      };
      //console.log(data)
      dispatch({
        type: "Add_Todo",
        data: data,
      });
    });
  }, []);

  const deleteTask = (e, key) => {
    const taskRef = ref(db, "todo/" + user.user.uid + "/" + key);
    console.log(key);
    remove(taskRef)
      .then((data) => {
        const newTaskList = todo.filter((task) => {
          return task.key !== key;
        });
        dispatch({
          type: "Delete",
          data: newTaskList,
        });
      })
      .catch((err) => {});
    // taskRef.remove().then((data) => {
    //   console.log(data);
    // });
  };
  return (
    <div>
      <div className="content">
        {
          allTask.map((todo) => {
            return (
              <TodoRow content={todo} deleteTask={deleteTask} key={todo.key} />
            );
          })
          // <TodoRow content="this is the to do list" />
        }
      </div>
    </div>
  );
}

export default ToDoBody;
