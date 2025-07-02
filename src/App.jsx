import { useEffect, useId, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Todoinput from "./components/Todoinput";
import TodoCard from "./components/TodoCard";
import TodoCardFinished from "./components/TodoCardFinished";
import { TodoContextProvider } from "./context/TodoContext";
import Canvas from "./components/Canvas";

function App() {
  
  function storeStateToLocalStorage(st1) {
    localStorage.setItem("Task", JSON.stringify(st1));
  }
  function loadStateFromLocalStorage() {
    const st = localStorage.getItem("Task");
    return st ? JSON.parse(st) : {finished:[],unfinished:[]};
  }

  const [Tasks, setTasks] = useState(loadStateFromLocalStorage||{finished:[],unfinished:[]});

  const [filter, setFilter] = useState('all');
  
  

  function addTask(newTask) {
    if (newTask != "") {

      const taskWithID={
        id:uuidv4(),
        task:newTask,
        isFinished:false
      };

      setTasks(prev=>({
        ...prev,
        unfinished:[taskWithID,...prev.unfinished]
      }));
    }

  }

  function removeTask(id,isFinished) {
    
    if(isFinished){
        const updated = Tasks.finished.filter(it =>it.id != id);
        setTasks({...Tasks,finished:updated});
    }else{
        const updated = Tasks.unfinished.filter(it =>it.id != id);
        setTasks({...Tasks,unfinished:updated});
    }
  }

  function editTask(id,task,isFinished) {
    if(isFinished){
        const updated=Tasks.finished.map(it=>(it.id===id)?{...it,task:task}:it);
        setTasks({...Tasks,finished:updated});
    }else{
        const updated=Tasks.unfinished.map(it=>(it.id===id)?{...it,task:task}:it);
        setTasks({...Tasks,unfinished:updated});
    }
  }

  function finishTask(id) {
    const taskToMove = Tasks.unfinished.find(item => item.id === id);
    if (!taskToMove) return;

    const updatedUnfinished = Tasks.unfinished.filter(item => item.id !== id);
    const updatedFinished=[{...taskToMove,isFinished:true},...Tasks.finished];

    setTasks({
      ...Tasks,
      finished:updatedFinished,
      unfinished:updatedUnfinished
    });
    console.log(Tasks);
  }

  function unfinishTask(id) {
    const taskToMove = Tasks.finished.find(item => item.id === id);
    if (!taskToMove) return;

    const updatedFinished = Tasks.finished.filter(item => item.id !== id);
    const updatedUnfinished=[{...taskToMove,isFinished:false},...Tasks.unfinished];

    setTasks({
      ...Tasks,
      finished:updatedFinished,
      unfinished:updatedUnfinished
    });
  }
  

  useEffect(
    () => {
      storeStateToLocalStorage(Tasks);
      
    },
    [Tasks]
  );
    console.log(Tasks);

  return (
    <TodoContextProvider value={{Tasks,addTask,removeTask,editTask,finishTask,unfinishTask}}>
      <div className="container min-h-screen overflow-y-auto min-w-max mx-auto    text-white p-4 select-none ">
        <h1 className="text-[#60d9b8] font-bold text-center text-3xl mb-2">Your To Do List</h1>

        <div className="  min-w-max h-fit  p-4">
          <div className="flex mb-4">
            <Todoinput />
          </div>

          <div className="flex mx-2">
            <div className="mx-2">
              <label className="cursor-pointer" htmlFor="finished">Finished</label>
              <input className="mx-1 cursor-pointer" type="radio" name="show" id="finished" onChange={()=>setFilter('finished')} />
            </div>
            <div className="mx-2">
              <label className="cursor-pointer" htmlFor="unfinished">Unfinished</label>
              <input className="mx-1 cursor-pointer border-none" type="radio" name="show" id="unfinished" onChange={()=>setFilter('unfinished')}/>
            </div>
            <div className="mx-2">
              <label className="cursor-pointer" htmlFor="all">All</label>
              <input className="mx-1 cursor-pointer" type="radio" name="show" id="all" defaultChecked onChange={() => setFilter('all')} />
            </div>
          </div>

        </div>


        <div className=" min-w-max p-4 h-fit">
          {(filter==='unfinished' || filter==='all') && 
          Tasks.unfinished.map(it=>(
                <TodoCard key={it.id} taskInfo={it}/>
              ))
          }

          {(filter==='finished'||filter==='all') &&
              Tasks.finished.map(it=>(
                <TodoCardFinished key={it.id} taskInfo={it}/>
              ))
          }
        </div>
        

      </div>
      <Canvas/>
    </TodoContextProvider >
  );
}

export default App;
