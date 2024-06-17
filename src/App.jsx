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

  window.addEventListener('load', () => {
   
    const taskinput = document.querySelector('.taskinput');
    const tasklist= document.querySelector('.tasklist');
    const inputfield = document.querySelector('.inputfield');
    const taskcard = document.querySelector('.taskcard');

    function matchWidth() {
      const widthA = taskinput.offsetWidth; 
      const widthB = inputfield.offsetWidth; 
      tasklist.style.width = widthA + 'px'; 
      taskcard.style.width = widthB + 'px'; 
    }

    matchWidth();


    window.addEventListener('resize', matchWidth);
  });

  return (
   
      <main>
        <Todoinput addTask={addTask} inputTask={inputTask} setInputTask={setInputTask} />
        <TodoList Tasks={Tasks} removeTask={removeTask} editTask={editTask } />
      </main>
    
  )
}

export default App
