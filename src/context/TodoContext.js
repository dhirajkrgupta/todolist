import { useContext, createContext } from "react";

export const TodoContext = createContext({
    addTask: (task) => { },
    removeTask: (id,isFinished) => { },
    editTask: (id,task,isFinished) => { },
    finishTask: (id) => { },
    unfinishTask:(id)=>{}
});

export default function useTodo() {
    return (
        useContext(TodoContext)
    )
}