import { useEffect, useState } from "react";
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
    const taskTobeEdited = Tasks[index].task;
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
      <div className="container mx-auto border-2 rounded-xl bg-[#363457]  text-white mt-1 p-4">
        <h1 className="text-[#d3b99f] font-bold text-center text-3xl mb-2">Your To Do List</h1>
        <div className="container bg-[#bdadea] rounded-t-xl mx-auto w-full p-4">
          <div className="flex mb-4">
          <Todoinput addTask={addTask} inputTask={inputTask} setInputTask={setInputTask} />
          </div>
          <div className="mx-2">
          <label htmlFor="finished">Show finished task</label>
          <input className="mx-1" type="checkbox" name="finished" id="finished" onChange={()=>setShowAll(!showAll)}/>
          </div>
        </div>
        <div className="container min-h-40 rounded-b-xl bg-[#bdadea] p-4	">
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
