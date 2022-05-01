import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import DropDown from "../DropDown/DropDown";
import Task from "../Task/Task";

import "./Tasks.css";

const Tasks = () => {
  const [tasksType, setTasksType] = useState("all");
  const { tasks, doneTasks, deleteAllTasks } = useContext(TaskContext);

  const changeDropDownHandler = (e) => {
    switch (e.target.dataset.catagory) {
      case "all":
        setTasksType("all");
        break;
      case "done":
        setTasksType("done");
        break;
      default:
        console.error("Tasks type is not valid");
    }
  };

  const getTasksList = (type) => {
    if (tasks.length === 0) {
      return <h4 className="nothing">You don't have any task to do</h4>;
    }

    if (type === "all") {
      return tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          topic={task.topic}
          content={task.content}
        />
      ));
    }

    if (type === "done") {
      return doneTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          topic={task.topic}
          content={task.content}
        />
      ));
    }
  };

  return (
    <div className="tasks">
      <div className="tasks__title">
        <img
          className="tasks__title__icon"
          src="./svg/all-task.svg"
          alt="All Tasks Icon"
        />
        <h2 className="tasks__title__text">All Tasks</h2>
      </div>
      <div className="tasks__filter">
        <DropDown onChangeDropDown={changeDropDownHandler} type={tasksType} />
        <motion.button
          className="btn-clear"
          whileTap={{ scale: 0.9 }}
          onClick={deleteAllTasks}
        >
          Clear All
        </motion.button>
      </div>
      <div className="tasks__container">
        <AnimatePresence>{getTasksList(tasksType)}</AnimatePresence>
      </div>
    </div>
  );
};

export default Tasks;
