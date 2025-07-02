import { useEffect, useRef, useState } from "react";
import Todoinput from "./components/Todoinput";
import TodoCard from "./components/TodoCard";
import TodoCardFinished from "./components/TodoCardFinished";
import { TodoContextProvider } from "./context/TodoContext";
import Canvas from "./components/Canvas";

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
  const [showFinished, setshowFinished] = useState(false);
  const [showUnfinished, setshowUnfinished] = useState(false);
  const taskinputBtnRef = useRef(null);

  function addTask(newTask) {
    if (newTask != "") {
      let id;
      if (Tasks.length===0) {
        id = 1;
      }
      else {
        id = Tasks[0].id+1;
      }
      const newTasks = [{id:id,task:newTask,isfinished:false},...Tasks];
      setTasks(newTasks);
    }
  }

  function removeTask(id) {
    const newTasks = Tasks.filter((it) => {
      return it.id != id;
    });
    setTasks(newTasks);
  }

  function editTask(id,task) {
    let idx = Tasks.findIndex(item => item.id === id);
    const newTasks = [...Tasks];
    newTasks[idx] = { ...newTasks[idx], task: task };
    setTasks(newTasks);
  }
  function finishTask(id) {
    let idx=Tasks.findIndex(item => item.id === id)
    const newTasks = [...Tasks];
    newTasks[idx] = { ...newTasks[idx], isfinished: true };
    setTasks(newTasks);
  }
  function unfinishTask(id) {
    let idx=Tasks.findIndex(item => item.id === id)
    const newTasks = [...Tasks];
    newTasks[idx].isfinished=false;
    setTasks(newTasks);
  }
  

  useEffect(
    () => {
      storeStateToLocalStorage(Tasks);
      
    },
    [Tasks]
  );
  

  return (
    <TodoContextProvider value={{Tasks,addTask,removeTask,editTask,finishTask,unfinishTask}}>
      <div className="container min-h-screen overflow-y-auto min-w-max mx-auto    text-white p-4 ">
        <h1 className="text-[#60d9b8] font-bold text-center text-3xl mb-2">Your To Do List</h1>
        <div className="  min-w-max h-fit  p-4">
          <div className="flex mb-4">
          <Todoinput inputTask={inputTask} setInputTask={setInputTask} taskinputBtnRef={taskinputBtnRef} />
          </div>
          <div className="flex mx-2">
            <div className="mx-2">
            <label className="cursor-pointer" htmlFor="finished">Finished</label>
            <input className="mx-1 cursor-pointer" type="radio" name="show" id="finished" onChange={()=>{setShowAll(false);setshowFinished(true);setshowUnfinished(false)}} />
          </div>
          <div className="mx-2">
            <label className="cursor-pointer" htmlFor="unfinished">Unfinished</label>
            <input className="mx-1 cursor-pointer border-none" type="radio" name="show" id="unfinished" onChange={()=>{setShowAll(false);setshowFinished(false);setshowUnfinished(true)}}/>
          </div>
          <div className="mx-2">
            <label className="cursor-pointer" htmlFor="all">All</label>
            <input className="mx-1 cursor-pointer" type="radio" name="show" id="all" defaultChecked onChange={() => { setShowAll(true); setshowFinished(false); setshowUnfinished(false) }} />
            </div>
          </div>
        </div>
        <div className=" min-w-max p-4 h-fit">
          {Tasks.filter(task => ((task.isfinished && showFinished) || (showAll) || ((!task.isfinished) && showUnfinished))).map((it) => {
            if (it.isfinished===true) return ""
            else return <TodoCard key={it.id} taskInfo={it}/>
          })}
          {Tasks.filter(task => ((task.isfinished && showFinished) || (showAll) || ((!task.isfinished) && showUnfinished))).map((it) => {
            if (it.isfinished===true) return <TodoCardFinished key={it.id} taskInfo={it} />
            else return ""
          })}
        </div>
        
      </div>
      <Canvas/>
    </TodoContextProvider >
  );
}

export default App;
