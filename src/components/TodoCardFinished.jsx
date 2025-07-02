import { useRef, useState,useEffect } from "react";
import useTodo from "../context/TodoContext";
import {checkmark,memo,cross} from "../assets"

export default function TodoCard({ taskInfo }) {
  const { removeTask, editTask, unfinishTask } = useTodo();
  const taskRef = useRef(null);
  const cardRef = useRef(null);

  const handleCheckBox = () => {
    unfinishTask(taskInfo.id);
  };
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(taskInfo.task);

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleAddClick = () => {
    if (task!="") {
      setEdit(false);
      taskInfo.task = task;
      editTask(taskInfo.id, task,taskInfo.isFinished);
    }
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleAddClick();
    }
  }

  const handleClickOutside = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setEdit(false);
      setTask(taskInfo.task);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  return (
    <div ref={cardRef} className="todo-card bg-gradient-to-br from-[#76c7c0] to-[#a8e063]  rounded-xl my-2 mx-2 p-2 flex border-2 border-slate-900  items-center ">
      <input className="w-fit  flex-none mx-2 outline-none scale-150"
        type="checkbox"
        name={taskInfo.id}
        id={taskInfo.id}
        checked
        onChange={handleCheckBox}
      />
      <label className="w-full h-fit grow  font-medium text-xl  text-white" htmlFor={taskInfo.id}>
        {edit? <input
              ref={taskRef}
              className="w-full px-2 bg-transparent edit-box-shadow outline-none  rounded"
              type="text"
              autoFocus
              value={task}
              onChange={e => {
                setTask(e.target.value);
            }}
            onKeyDown={handleEnter}
            />
          : <p className="px-2">{task}</p>
        }
      </label>

      <button className="w-fit flex-none  text-2xl rounded-2xl ">
        {!edit? <span onClick={handleEditClick}><img src={memo} className="w-8" alt="edit" /></span> : <span onClick={handleAddClick} ><img src={checkmark} className="w-8" alt="checkmark" /></span>}
      </button>

      <button className="w-fit flex-none  text-2xl rounded-2xl"
        onClick={() => removeTask(taskInfo.id,taskInfo.isFinished)}
      >
        <img src={cross} className="w-8" alt="delete" />
      </button>
      
    </div>
  );
}
