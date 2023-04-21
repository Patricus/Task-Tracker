import React, { useState } from "react";
import useTasks from "../Context/Tasks";

export default function AddTask() {
  const [addModal, setAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planning");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);

  const { addTask } = useTasks();

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
        setDueDate(new Date(value).toISOString().split("T")[0]);
        break;
      default:
        break;
    }
  };
  const handleAdd = async e => {
    e.preventDefault();
    const newTask = await addTask({
      title,
      description,
      status,
      dueDate,
    });
    if (newTask) {
      setAddModal(false);
      setTitle("");
      setDescription("");
      setStatus("Planning");
      setDueDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white rounded-lg px-2 py-0.5 uppercase text-sm font-semibold mx-1.5 pl-2 pr-2.5 hover:opacity-70"
        type="button"
        onClick={() => setAddModal(true)}>
        + New
      </button>
      {addModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                <h3 className="text-3xl">Add New Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => setAddModal(false)}>
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
                  onClick={handleAdd}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
