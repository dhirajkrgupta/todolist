import React from "react";

export default function TodoCard(props) {
  const { children, removeTask,index,editTask} = props;
  return (
      <li>
          {children}
      <div className="Edit">
        <button onClick={()=>{editTask(index)}}>
          <i className="fa-solid fa-pen-to-square" />
        </button>
        <button onClick={()=>{removeTask(index)}}>
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    </li>
  );
}
