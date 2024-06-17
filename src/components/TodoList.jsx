import React from "react";
import TodoCard from "./TodoCard";

export default function TodoList(props) {
    const { Tasks} = props;
  return (
    <ul className="tasklist">
      {Tasks.map((task, taskidx) => {
        return (
            <TodoCard {...props} key={taskidx} index={taskidx}>
                <p>{task}</p>
          </TodoCard>
        );
      })}
    </ul>
  );
}
