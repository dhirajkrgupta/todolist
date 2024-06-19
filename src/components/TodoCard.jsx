
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function TodoCard(props) {
  const { task,isfinished, removeTask, index, editTask, finishTask ,unfinishTask} = props;
  return (
    <div className="todo-card rounded-xl my-2 mx-2 flex border-2 border-white items-center">
      <input className="w-fit flex-none mx-2" type="checkbox" name="done" id="done" checked={isfinished} onChange={() => {isfinished?unfinishTask(index):finishTask(index)}} />
      {isfinished ? <p className="w-full h-fit grow mx-2"><del>{task}</del></p>:<p className="w-full h-fit grow mx-2">{task}</p>}
      <button className="w-fit flex-none  text-xl rounded-xl" onClick={()=>{editTask(index)}}><FaEdit /></button>
      <button className="w-fit flex-none  text-xl rounded-xl" onClick={() => removeTask(index)}><MdDelete /></button>
    </div>
  );
}
