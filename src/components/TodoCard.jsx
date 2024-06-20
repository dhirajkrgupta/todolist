
import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function TodoCard(props) {
  const { task, isfinished, removeTask, index, editTask, finishTask, unfinishTask } = props;
  const paraRef = useRef(null);
  const handleChange=(e)=>{
    if (e.target.checked) {
      
      finishTask(index);
    }
    else {
      
      unfinishTask(index);
    }
    
  }
  return (
    <div className="todo-card rounded-xl my-2 mx-2 p-2 flex border-2 border-white items-center">
      <input ref={paraRef} className="w-fit  flex-none mx-2 outline-none scale-150" type="checkbox" name={`done` + index} id={`done` + index} checked={isfinished} onChange={handleChange} />
      <label htmlFor={`done` + index} ref={paraRef} className={`w-full h-fit grow mx-2 font-medium text-xl ${isfinished?'line-through':''}`}>{task}</label>
      <button className="w-fit flex-none  text-2xl rounded-2xl " onClick={()=>{editTask(index)}}><FaEdit /></button>
      <button className="w-fit flex-none  text-2xl rounded-2xl" onClick={() => removeTask(index)}><MdDelete /></button>
    </div>
  );
}
