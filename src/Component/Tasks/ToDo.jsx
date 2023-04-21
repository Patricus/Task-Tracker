import useTasks from "../Context/Tasks";
import EditTask from "./EditTask";

export default function ToDo(task) {
  const { id, title, description, status, due_date: dueDate } = task;
  const { removeTask } = useTasks();
  return (
    <div className="flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg shadow-lg rounded-lg hover:bg-green-200">
      <div className="w-full flex flex-row justify-between">
        <p className="font-semibold text-xl ">{title}</p>
        <div>
          <span>{new Date(dueDate).toLocaleDateString("en-US")}</span>
          <span>{status}</span>
        </div>
        <EditTask task={task} />
      </div>
      <p className="text-lg py-4">{description}</p>
      <div className="w-full flex justify-center">
        <button
          className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg mt-6 mb-1"
          onClick={() => removeTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
