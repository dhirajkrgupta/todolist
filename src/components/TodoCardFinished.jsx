import { useRef, useState,useEffect } from "react";
import useTodo from "../context/TodoContext";


export default function TodoCard(props) {
  const { removeTask, editTask, unfinishTask } = useTodo();
  const { taskInfo } = props;
  const taskRef = useRef(null);
  const cardRef = useRef(null);

  const handleChange = () => {
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
      editTask(taskInfo.id, task);
    }
  };
  const handleKeyDown = (e) => {
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
    <div ref={cardRef} className="todo-card bg-[#6f42c1]  rounded-xl my-2 mx-2 p-2 flex border-2 border-slate-900 text-slate-900 items-center">
      <input
        className="w-fit  flex-none mx-2 outline-none scale-150"
        type="checkbox"
        name={taskInfo.id}
        id={taskInfo.id}
        checked
        onChange={handleChange}
      />
      <label
        htmlFor={taskInfo.id}
        className="w-full h-fit grow mx-2 font-medium text-xl line-through"
      >
        {edit
          ? <input
              ref={taskRef}
              className="w-full bg-[rgba(0,0,0,0)] outline-none shadow-inner rounded"
              type="text"
              autoFocus
              value={task}
              onChange={e => {
                setTask(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            />
          : task}
      </label>
      <button
        className="w-fit flex-none  text-2xl rounded-2xl "
      >
        {edit == false ? <span onClick={handleEditClick}>{"📝"}</span> : <span onClick={handleAddClick}>{"✔"}</span>}
      </button>
      <button
        className="w-fit flex-none  text-2xl rounded-2xl"
        onClick={() => removeTask(taskInfo.id)}
      >
        {"❌"}
      </button>
    </div>
  );
}
