
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function TodoCard(props) {
  const { task,isfinished, removeTask, index, editTask, finishTask ,unfinishTask} = props;
  return (
    <div className="todo-card rounded-xl my-2 mx-2 p-2 flex border-2 border-white items-center">
      <input className="w-fit  flex-none mx-2 outline-none scale-150" type="checkbox" name={`done`+index} id={`done`+index} checked={isfinished} onChange={() => {isfinished?unfinishTask(index):finishTask(index)}} />
      {isfinished ? <label htmlFor={`done`+index} className="w-full h-fit grow mx-2 font-medium text-xl line-through">{task}</label>:<label htmlFor={`done`+index} className="w-full h-fit grow mx-2 font-medium text-xl">{task}</label>}
      <button className="w-fit flex-none  text-2xl rounded-2xl" onClick={()=>{editTask(index)}}><FaEdit /></button>
      <button className="w-fit flex-none  text-2xl rounded-2xl" onClick={() => removeTask(index)}><MdDelete /></button>
    </div>
  );
}
