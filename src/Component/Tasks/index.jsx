import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import ToDo from "./ToDo";
// import ToDoBoard from "./ToDoBoard";
import useTasks from "../Context/Tasks";
import useUser from "../Context/User";

export default function index() {
  const [sort, setSort] = useState("status");
  const { user, logOut } = useUser();
  const { tasks, fetchTasks, sortTasks } = useTasks();

  useEffect(() => {
    sortTasks(sort);
  }, [sort]);

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <div>
      <div className="flex space-x-10">
        <button onClick={logOut}>Log Out</button>
        <h2>{user.name}</h2>
      </div>
      <h1 className="text-2xl font-bold py-6 pl-6">03 - The task Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6"> Click</p>
        <AddTask />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div>
        <label htmlFor="sort">Sort By</label>
        <select name="sort" id="sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="status">Status</option>
          <option value="date">Due Date</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div>
        <h2 className="ml-6 text-xl bg-gray-300 font-semibold w-3/4 max-w-lg py-2 px-4 my-4">
          To Do:
        </h2>
        {tasks.map((task, i) => (
          <ToDo key={i} {...task} />
        ))}
      </div>
    </div>
  );
}
