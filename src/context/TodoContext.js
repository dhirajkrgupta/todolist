import { useContext, createContext } from "react";

export const TodoContext = createContext({
    Tasks: [
        {
            id: 1,
            task: "node js",
            isFinished:false
        }
    ],
    addTask: (task) => { },
    removeTask: (id) => { },
    editTask: (id) => { },
    finishTask: (id) => { },
    unfinishTask:(id)=>{}
});

export const TodoContextProvider = TodoContext.Provider;

export default function useTodo() {
    return (
        useContext(TodoContext)
    )
}