import { v4 as uuid4 } from "uuid";
import { createContext, useState, useEffect } from "react";

const TaskContext = createContext({
  tasks: [],
});

export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState(
    !localStorage.getItem("tasks")
      ? localStorage.setItem("tasks", JSON.stringify([]))
      : []
  );
  const [doneTasks, setDoneTasks] = useState([]);
  const [PopUp, setPopUp] = useState({ in: false, item: null });

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  useEffect(() => {
    const allDoneTasks = tasks.filter((task) => task.isDone === true);
    setDoneTasks(allDoneTasks);
  }, [tasks]);

  const addTask = (topic, content) => {
    const oldTasks = JSON.parse(localStorage.getItem("tasks"));
    const newTask = {
      id: uuid4(),
      isDone: false,
      topic,
      content,
    };

    localStorage.setItem("tasks", JSON.stringify([newTask, ...oldTasks]));
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const deleteAllTasks = () => {
    setTasks([]);
    localStorage.setItem("tasks", JSON.stringify([]));
  };

  const selectDoneTask = (id) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    newTasks[index].isDone = !newTasks[index].isDone;

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const setId = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    setPopUp({ in: !PopUp.in, item: tasks[index] });
  };

  const editTask = (text) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === PopUp.item.id);

    newTasks[index].topic = text.topic;
    newTasks[index].content = text.content;

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        selectDoneTask,
        PopUp,
        setPopUp,
        setId,
        deleteAllTasks,
        editTask,
        doneTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
