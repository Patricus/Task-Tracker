import { useContext, createContext, useState } from "react";
import useUser from "./User";

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
        // TODO: Implement api call to fetch tasks
        setTasks([]);
    };

    const addTask = task => {
        // TODO: Implement api call to add task
        setTasks(tasks => {
            return tasks.concat(task);
        });
    };

    const removeTask = ({ id: taskId }) => {
        // TODO: Implement api call to delete task
        setTasks(tasks => {
            return tasks.filter(task => task.id !== taskId);
        });
    };

    const editTask = updatedTask => {
        // TODO: Implement api call to update task
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
