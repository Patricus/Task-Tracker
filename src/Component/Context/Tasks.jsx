import { useContext, createContext, useState } from "react";
import useUser from "./User";

const TaskType = ["Planning", "In Progress", "Completed"];

const TasksContext = createContext({
  tasks: [],
  fetchTasks: () => {},
  addTask: task => {},
  removeTask: task => {},
  editTask: task => {},
});

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const { user } = useUser();

  const fetchTasks = () => {
    fetch(`api/tasks/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setTasks(data.tasks);
        else console.error(data.error);
      })
      .catch(err => console.error(err));
  };

  const addTask = async newTask => {
    return await fetch(`api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, task: newTask }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setTasks(tasks => tasks.concat(data.task));
          return data.task;
        } else {
          throw new Error(data.error);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const removeTask = id => {
    fetch(`api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) console.error(data.error);
      })
      .catch(err => console.error(err));

    setTasks(tasks => {
      return tasks.filter(task => task.id !== id);
    });
  };

  const editTask = updatedTask => {
    console.log("updatedTask", updatedTask);
    fetch(`api/tasks/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, task: updatedTask }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setTasks(
            tasks.map(task => {
              if (task.id === data.task.id) {
                return data.task;
              }
              return task;
            })
          );
        } else console.error(data.error);
      })
      .catch(err => console.error(err));

    setTasks(tasks => {
      return tasks.map(task => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      });
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks, addTask, removeTask, editTask }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => useContext(TasksContext);

export default useTasks;
