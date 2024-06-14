import { useState } from "react";
import TodoList from "./components/TodoList"
import Todoinput from "./components/Todoinput"

function App() {
  const [Tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');

  function addTask(newTask) {
    const newTasks = [...Tasks, newTask];
    setTasks(newTasks);
  }
  function removeTask(index) {
    const newTasks = Tasks.filter((task,taskidx) => {
      return taskidx != index;
    })
    setTasks(newTasks);
  }
  function editTask(index) {
    const taskTobeEdited = Tasks[index];
    setInputTask(taskTobeEdited);
    removeTask(index);
  }

  return (
    <>
      <main>
        <Todoinput addTask={addTask} inputTask={inputTask} setInputTask={setInputTask} />
        <TodoList Tasks={Tasks} removeTask={removeTask} editTask={editTask } />
      </main>
    </>
  )
}

export default App
