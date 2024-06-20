import { useEffect, useRef, useState } from "react";
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
  const [showFinished, setshowFinished] = useState(false);
  const [showUnfinished, setshowUnfinished] = useState(false);
  const taskinputBtnRef = useRef(null);

  function addTask(newTask) {
    if (newTask != "") {
      let id = Tasks.length;
      const newTasks = [ ...Tasks,{id:id,task:newTask,isfinished:false} ];
      setTasks(newTasks);
    }
  }
  function removeTask(index) {
    const newTasks = Tasks.filter((it) => {
      return it.id != index;
    });
    for (let i = 0; i < newTasks.length; i++){
      newTasks[i].id = i;
    }
    setTasks(newTasks);
  }
  function editTask(index) {
    const taskTobeEdited = Tasks.find(item => item.id === index);
    setInputTask(taskTobeEdited.task);
    removeTask(index);
    taskinputBtnRef.current.focus();
  }
  function finishTask(index) {
    const newTasks = [...Tasks];
    newTasks[index] = { ...newTasks[index], isfinished: true };
    setTasks(newTasks);
  }
  function unfinishTask(index) {
    
    const newTasks = [...Tasks];
    newTasks[index].isfinished=false;
    setTasks(newTasks);
  }
  

  useEffect(
    () => {
      storeStateToLocalStorage(Tasks);
      
    },
    [Tasks]
  );
  

  return (
    <>
      <div className="container min-w-fit min-h-fit mx-auto border-2 rounded-xl bg-[#363457]  text-white mt-1 p-4 absolute top-2/4 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <h1 className="text-[#d3b99f] font-bold text-center text-3xl mb-2">Your To Do List</h1>
        <div className="container bg-[#bdadea] rounded-t-xl mx-auto w-full p-4">
          <div className="flex mb-4">
          <Todoinput addTask={addTask} inputTask={inputTask} setInputTask={setInputTask} taskinputBtnRef={taskinputBtnRef} />
          </div>
          <div className="flex">
            <div className="mx-2">
              <label htmlFor="show">Finished</label>
              <input className="mx-1" type="radio" name="show" id="finished" onChange={()=>{setShowAll(false);setshowFinished(true);setshowUnfinished(false)}} />
            </div>
            <div className="mx-2">
              <label htmlFor="show">Unfinished</label>
              <input className="mx-1" type="radio" name="show" id="unfinished" onChange={()=>{setShowAll(false);setshowFinished(false);setshowUnfinished(true)}}/>
            </div>
            <div className="mx-2">
              <label htmlFor="show">All</label>
              <input className="mx-1" type="radio" name="show" id="all" defaultChecked onChange={()=>{setShowAll(true);setshowFinished(false);setshowUnfinished(false)}} />
            </div>
          </div>
        </div>
        <div className="container min-h-96 rounded-b-xl bg-[#bdadea] p-4	">
          {Tasks.filter(task=>((task.isfinished && showFinished)||(showAll)||((!task.isfinished) && showUnfinished))).map((it) => {
            return (
              <TodoCard key={it.id} task={it.task} isfinished={it.isfinished} removeTask={removeTask} index={it.id} editTask={editTask} finishTask={finishTask} unfinishTask={unfinishTask}></TodoCard>
            )
          })}
        </div>
        
      </div>
    </>
  );
}

export default App;
