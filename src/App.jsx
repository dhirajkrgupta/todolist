import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Todoinput from "./components/Todoinput";
import TodoCard from "./components/TodoCard";

function App() {
  
  function storeStateToLocalStorage(st1) {
    localStorage.setItem("Tasks", JSON.stringify(st1));
  }
  function loadStateFromLocalStorage() {
    const st = localStorage.getItem("Tasks");
    return st ? JSON.parse(st) : [];
  }

  const [Tasks, setTasks] = useState(loadStateFromLocalStorage||[]);
  const [inputTask, setInputTask] = useState("");
  const [showAll, setShowAll] = useState(true);

  function addTask(newTask) {
    if (newTask != "") {
      
      const newTasks = [ ...Tasks,{task:newTask,isfinished:false} ];
      setTasks(newTasks);
    }
  }
  function removeTask(index) {
    const newTasks = Tasks.filter((_, taskidx) => {
      return taskidx != index;
    });
    setTasks(newTasks);
  }
  function editTask(index) {
    const taskTobeEdited = Tasks[index];
    setInputTask(taskTobeEdited);
    removeTask(index);
  }
  function finishTask(index) {
    const newTasks = [...Tasks];
    newTasks[index] = { ...newTasks[index], isfinished: true };
    setTasks(newTasks);
  }
  function unfinishTask(index) {
    const newTasks = [...Tasks];
    newTasks[index] = { ...newTasks[index], isfinished: false };
    setTasks(newTasks);
  }
  

  useEffect(
    () => {
      storeStateToLocalStorage(Tasks);
      console.log(Tasks);
    },
    [Tasks]
  );

  return (
    <>
      <div className="container mx-auto border-2  text-white mt-1 p-4">
        <h1 className="text-emerald-600 font-bold text-center">Your To Do List</h1>
        <div className="container bg-black mx-auto w-full p-2">
          <div className="flex">
          <Todoinput addTask={addTask} inputTask={inputTask} setInputTask={setInputTask} />
          </div>
          <div className="mx-2">
          <label htmlFor="finished">Show finished task</label>
          <input className="mx-1" type="checkbox" name="finished" id="finished" onChange={()=>setShowAll(!showAll)}/>
          </div>
        </div>
        <div className="container min-h-40 bg-violet-700	">
          {Tasks.filter(task=>(task.isfinished||showAll)).map((it, idx) => {
            return (
              <TodoCard key={idx} task={it.task} isfinished={it.isfinished} removeTask={removeTask} index={idx} editTask={editTask} finishTask={finishTask} unfinishTask={unfinishTask}></TodoCard>
            )
          })}
        </div>
        
      </div>
    </>
  );
}

export default App;
