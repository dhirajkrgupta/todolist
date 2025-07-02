import { useState,useEffect } from "react";
import Todoinput from "./components/Todoinput";
import TodoCard from "./components/TodoCard";
import TodoCardFinished from "./components/TodoCardFinished";
import { TodoProvider } from "./context/TodoProvider";
import Canvas from "./components/Canvas";

function App() {
   const [filter, setFilter] = useState('all');
   const [Tasks, setTasks] = useState(loadStateFromLocalStorage||{finished:[],unfinished:[]});

    function storeStateToLocalStorage(st1) {
    localStorage.setItem("Task", JSON.stringify(st1));
  }
  function loadStateFromLocalStorage() {
    const st = localStorage.getItem("Task");
    return st ? JSON.parse(st) : {finished:[],unfinished:[]};
  }
    useEffect(
    () => {
    storeStateToLocalStorage(Tasks);
    
    },
    [Tasks]
);

  return (
    <TodoProvider Tasks={Tasks} setTasks={setTasks}>
      <div className="p-0 min-w-[320px] max-w-[750px] text-white  select-none m-auto ">
        <h1 className="text-[#60d9b8] font-bold text-center text-3xl mb-2">Your To Do List</h1>

        <div className="min-w-80 h-fit  p-0">
          <div className="flex mb-4 justify-center p-2">
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


        <div className=" min-w-max p-0 h-fit">
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
    </TodoProvider >
  );
}

export default App;
