
import add from "../assets/add.png"
import {useRef} from "react";
import useTodo from "../context/TodoContext";
export default function Todoinput(props) {

  const { inputTask, setInputTask, taskinputBtnRef } = props;
  const { addTask } = useTodo();
  const addbtnRef=useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      addbtnRef.current.click();
    }
  };
  return (
    <>
      <input ref={taskinputBtnRef} className=" placeholder:text-slate-900 text-slate-900 bg-[#bdadea] grow mx-2 p-2 px-4 font-bold rounded-3xl outline-none input-box-shadow" type="text" placeholder="Enter Task..." name="task" id="task" value={inputTask} onChange={(e)=>{setInputTask(e.target.value)}} onKeyDown={handleKeyDown}/>
      <button ref={addbtnRef} onClick={() => { addTask(inputTask); setInputTask("") }} className="bg-[#75dddd] text-black  w-fit mx-2 p-2 px-4 rounded-xl btn-shadow"><img src={add} className="w-8 " alt="add" /></button>
    </>
  );
}
