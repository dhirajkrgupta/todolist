import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Todoinput from "./components/Todoinput";

function App() {
  const [Tasks, setTasks] = useState(loadStateFromLocalStorage||{});
  const [inputTask, setInputTask] = useState([]);

  function addTask(newTask) {
    const newTasks = [...Tasks, newTask];
    setTasks(newTasks);
  }
  function removeTask(index) {
    const newTasks = Tasks.filter((task, taskidx) => {
      return taskidx != index;
    });
    setTasks(newTasks);
  }
  function editTask(index) {
    const taskTobeEdited = Tasks[index];
    setInputTask(taskTobeEdited);
    removeTask(index);
  }

  window.addEventListener("load", () => {
    const taskinput = document.querySelector(".taskinput");
    const tasklist = document.querySelector(".tasklist");

    function matchWidth() {
      const widthA = taskinput.offsetWidth;
      tasklist.style.width = widthA + "px";
    }

    matchWidth();

    window.addEventListener("resize", matchWidth);
  });

  function storeStateToLocalStorage(st) {
    localStorage.setItem("appState", JSON.stringify(st));
  }
  function loadStateFromLocalStorage() {
    const st = localStorage.getItem("appState");
    return st ? JSON.parse(st) : undefined;
  }

  useEffect(
    () => {
      storeStateToLocalStorage(Tasks);
    },
    [Tasks]
  );

  return (
    <main>
      <Todoinput
        addTask={addTask}
        inputTask={inputTask}
        setInputTask={setInputTask}
      />
      <TodoList Tasks={Tasks} removeTask={removeTask} editTask={editTask} />
    </main>
  );
}

export default App;
