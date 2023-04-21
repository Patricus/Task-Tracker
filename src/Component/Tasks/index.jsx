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
      <div className="flex justify-between m-2">
        <button
          className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg"
          onClick={logOut}>
          Log Out
        </button>
        <p className="text-2xl pl-6">{`Hello, ${user.name}`}</p>
      </div>
      <h1 className="text-4xl font-bold w-screen text-center">Task Tracker</h1>
      <div className="flex justify-around">
        <AddTask />
        <div>
          <label htmlFor="sort">Sort By </label>
          <select
            className="border border-gray-300 rounded-lg w-fit"
            name="sort"
            id="sort"
            value={sort}
            onChange={e => setSort(e.target.value)}>
            <option value="status">Status</option>
            <option value="date">Due Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div>
        <h2 className="mx-6 text-xl bg-gray-300 font-semibold py-2 px-4 my-4 text-center">
          Tasks:
        </h2>
        {tasks.map((task, i) => (
          <ToDo key={i} {...task} />
        ))}
      </div>
    </div>
  );
}
