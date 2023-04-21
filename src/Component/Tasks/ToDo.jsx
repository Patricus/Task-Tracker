import useTasks from "../Context/Tasks";
import EditTask from "./EditTask";

export default function ToDo(task) {
  const { id, title, description, status, due_date: dueDate } = task;
  const { removeTask } = useTasks();
  const statusColor = (() => {
    switch (status) {
      case "In Progress":
        return "text-orange-400";
      case "Complete":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  })();

  return (
    <div className="flex flex-col items-start justify-start bg-white my-4 mx-6 py-4 px-6  shadow-lg rounded-lg hover:bg-green-200">
      <p className="font-semibold text-2xl text-center w-full overflow-x-auto">{title}</p>
      <div className="w-full flex flex-row justify-between">
        <span>{`Due Date: ${new Date(dueDate).toLocaleDateString("en-US")}`}</span>
        <span className={statusColor}>{status}</span>
      </div>
      <p className="text-lg px-4 bg-slate-200 rounded w-full mt-2 shadow-inner whitespace-normal break-words">
        {description}
      </p>
      <div className="w-full flex justify-evenly gap-4 pt-4">
        <EditTask task={task} />
        <button
          className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg"
          onClick={() => removeTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
