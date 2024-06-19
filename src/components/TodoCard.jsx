import React, { useRef } from "react";

export default function TodoCard(props) {
  const { task,isfinished, removeTask, index, editTask, finishTask ,unfinishTask} = props;
  return (
    <div className="todo-card bg-blue-500 my-2 flex p-2">
      <input className="w-fit flex-none mx-2" type="checkbox" name="done" id="done" checked={isfinished} onChange={() => {isfinished?unfinishTask(index):finishTask(index)}} />
      {isfinished ? <p className="w-full grow mx-2"><del>{task}</del></p>:<p className="w-full grow mx-2">{task}</p>}
      <button className="w-fit flex-none mx-2" onClick={()=>{editTask(index)}}>Edit</button>
      <button className="w-fit flex-none mx-2" onClick={() => removeTask(index)}>Remove</button>
    </div>
  );
}
