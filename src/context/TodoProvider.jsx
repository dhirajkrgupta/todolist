import { TodoContext } from "./TodoContext"
import { v4 as uuidv4 } from 'uuid';



export const TodoProvider =({Tasks,setTasks,children})=>{

   

    function addTask(newTask) {
    if (newTask != "") {

    const taskWithID={
        id:uuidv4(),
        task:newTask,
        isFinished:false
    };

    setTasks(prev=>({
        ...prev,
        unfinished:[taskWithID,...prev.unfinished]
    }));
    }

}
function removeTask(id,isFinished) {
    
    if(isFinished){
        const updated = Tasks.finished.filter(it =>it.id != id);
        setTasks({...Tasks,finished:updated});
    }else{
        const updated = Tasks.unfinished.filter(it =>it.id != id);
        setTasks({...Tasks,unfinished:updated});
    }
}
function editTask(id,task,isFinished) {
    if(isFinished){
        const updated=Tasks.finished.map(it=>(it.id===id)?{...it,task:task}:it);
        setTasks({...Tasks,finished:updated});
    }else{
        const updated=Tasks.unfinished.map(it=>(it.id===id)?{...it,task:task}:it);
        setTasks({...Tasks,unfinished:updated});
    }
    }

    function finishTask(id) {
    const taskToMove = Tasks.unfinished.find(item => item.id === id);
    if (!taskToMove) return;

    const updatedUnfinished = Tasks.unfinished.filter(item => item.id !== id);
    const updatedFinished=[{...taskToMove,isFinished:true},...Tasks.finished];

    setTasks({
        ...Tasks,
        finished:updatedFinished,
        unfinished:updatedUnfinished
    });
    console.log(Tasks);
    }

    function unfinishTask(id) {
    const taskToMove = Tasks.finished.find(item => item.id === id);
    if (!taskToMove) return;

    const updatedFinished = Tasks.finished.filter(item => item.id !== id);
    const updatedUnfinished=[{...taskToMove,isFinished:false},...Tasks.unfinished];

    setTasks({
        ...Tasks,
        finished:updatedFinished,
        unfinished:updatedUnfinished
    });
    }
    return(
        <TodoContext.Provider value={{Tasks,addTask,removeTask,editTask,finishTask,unfinishTask}}>
            {children}
        </TodoContext.Provider>
    )
} 

