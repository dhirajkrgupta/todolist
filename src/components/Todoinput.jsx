

export default function Todoinput(props) {
  const { addTask, inputTask, setInputTask } = props;
  return (
    <>
      <input className="text-black grow mx-2 p-2" type="text" placeholder="Enter Task..." name="task" id="task" value={inputTask} onChange={(e)=>{setInputTask(e.target.value)}}/>
      <button onClick={() => { addTask(inputTask); setInputTask("")} } className="bg-slate-700 w-fit mx-2 p-2">Add</button>
    </>
  );
}
