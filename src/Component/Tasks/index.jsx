import { useState } from "react";
import AddTask from "./AddTask";
import ToDo from "./ToDo";
// import ToDoBoard from "./ToDoBoard";
import useTasks from "../Context/Tasks";
import useUser from "../Context/User";

export default function index() {
  const [taskList, setTaskList] = useState([]);

  const { logOut } = useUser();
  const { tasks, fetchTasks, addTask, removeTask, editTask } = useTasks();

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <h1 className="text-2xl font-bold py-6 pl-6">03 - The task Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6"> Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div>
        <h2 className="ml-6 text-xl bg-gray-300 font-semibold w-3/4 max-w-lg py-2 px-4 my-4">
          To Do:
        </h2>
        {taskList.map((task, i) => (
          <>
            <ToDo key={i} task={task} index={i} taskList={taskList} setTaskList={setTaskList} />
          </>
        ))}
      </div>
    </div>
  );
}
