
import add from "../assets/add.png"
import {useRef, useState} from "react";
import useTodo from "../context/TodoContext";
export default function Todoinput() {

  const [inputTask, setInputTask] = useState('');

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
      <input  className=" placeholder:text-slate-900 text-slate-900 bg-[#bdadea]  p-2 font-bold rounded-3xl outline-none input-box-shadow min-w-[212px] grow max-w-[750px] mr-2" type="text" placeholder="Enter Task..." name="task" id="task" value={inputTask} onChange={e=>setInputTask(e.target.value)} onKeyDown={handleKeyDown}/>

      <button ref={addbtnRef} onClick={() => { addTask(inputTask); setInputTask("") }} className="bg-[#75dddd] text-black   p-1  rounded-xl btn-shadow"><img src={add} className="w-8 " alt="add" /></button>
    </>
  );
}
