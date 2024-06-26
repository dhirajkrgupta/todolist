
import { IoMdAdd } from "react-icons/io";
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
      <input ref={taskinputBtnRef} className="text-black bg-[#f3fcf0] grow mx-2 p-2 rounded-3xl outline-none" type="text" placeholder="Enter Task..." name="task" id="task" value={inputTask} onChange={(e)=>{setInputTask(e.target.value)}} onKeyDown={handleKeyDown}/>
      <button ref={addbtnRef} onClick={() => { addTask(inputTask); setInputTask("") }} className="bg-[#75dddd] text-black  w-fit mx-2 p-2 px-4 rounded-xl">{ "➕"}</button>
    </>
  );
}
