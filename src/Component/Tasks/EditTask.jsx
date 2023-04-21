import React, { useState } from "react";
import useTasks from "../Context/Tasks";
import useUser from "../Context/User";

export default function EditTask({ task }) {
  const [editModal, setEditModal] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(
    task.due_date ? task.due_date.split("T")[0] : task.dueDate
  );

  const { editTask } = useTasks();

  const handleInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "dueDate":
        console.log("dueDate-value", value);
        setDueDate(value);
        break;
      default:
        break;
    }
  };
  const handleEdit = e => {
    e.preventDefault();
    editTask({
      id: task.id,
      title,
      description,
      status,
      dueDate,
    });

    setEditModal(false);
  };
  return (
    <div>
      <button
        className="bg-gray-400 text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
        type="button"
        onClick={() => setEditModal(true)}>
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                <h3 className="text-3xl">Edit Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => setEditModal(false)}>
                  x
                </button>
              </div>
              <form className="px-6 pt-6 pb-4">
                <div className="">
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="title">
                    Title
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700
                  border
                  border-gray-200
                  rounded
                  py-3
                  px-4
                  mb-5
                  leading-tight
                  focus:outline-none
                  focus:bg-white"
                    name="title"
                    value={title}
                    onChange={handleInput}
                    type="text"
                    placeholder="Title"
                    required
                  />
                </div>
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="w-full bg-gray-200 text-gray-700
                  border
                  border-gray-200
                  rounded
                  py-3
                  px-4
                  mb-5
                  leading-tight
                  focus:outline-none
                  focus:bg-white"
                    id="task-description"
                    rows="5"
                    placeholder="Task description"
                    name="description"
                    value={description}
                    onChange={handleInput}></textarea>
                </div>
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="status">
                    Status
                  </label>
                  <select
                    className="w-full bg-gray-200 text-gray-700
                  border
                  border-gray-200
                  rounded
                  py-3
                  px-4
                  mb-5
                  leading-tight
                  focus:outline-none
                  focus:bg-white"
                    type="number"
                    name="status"
                    value={status}
                    onChange={handleInput}>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="dueDate">
                    Date
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700
                  border
                  border-gray-200
                  rounded
                  py-3
                  px-4
                  mb-5
                  leading-tight
                  focus:outline-none
                  focus:bg-white"
                    type="date"
                    name="dueDate"
                    value={dueDate}
                    onChange={handleInput}
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b ">
                <button
                  className="bg-blue-500
                text-white font-semibold
                uppercase text-sm px-6 py-3
                rounded hover:opacity-70"
                  onClick={handleEdit}>
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
