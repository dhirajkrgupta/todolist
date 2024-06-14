import { useState } from "react";

export default function Todoinput(props) {
  const { addTask, inputTask, setInputTask } = props;
  return (
    <header>
      <input
        type="text"
        placeholder="Enter Task.."
        value={inputTask}
        onChange={e => {
          setInputTask(e.target.value);
        }}
      />
      <button id="addBtn"
        onClick={() => {
          if (inputTask!='') {
            addTask(inputTask);
          }
          setInputTask("");
        }}
      >
        Add Task
      </button>
    </header>
  );
}
