import React from "react";

export default function TodoCard(props) {
  const { children, removeTask,index,editTask} = props;
  return (
      <li className="taskcard">
          {children}
      <div className="Edit">
        <button className="iconBtn" onClick={()=>{editTask(index)}}>
          <i className="fa-solid fa-pen-to-square" />
        </button>
        <button className="iconBtn" onClick={()=>{removeTask(index)}}>
        <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </li>
  );
}
