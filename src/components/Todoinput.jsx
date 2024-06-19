
import { IoMdAdd } from "react-icons/io";
export default function Todoinput(props) {
  const { addTask, inputTask, setInputTask } = props;
  return (
    <>
      <input className="text-black bg-[#f3fcf0] grow mx-2 p-2 rounded-3xl outline-none" type="text" placeholder="Enter Task..." name="task" id="task" value={inputTask} onChange={(e)=>{setInputTask(e.target.value)}}/>
      <button onClick={() => { addTask(inputTask); setInputTask("")} } className="bg-[#75dddd] text-black  w-fit mx-2 p-2 px-4 rounded-xl"><IoMdAdd /></button>
    </>
  );
}
