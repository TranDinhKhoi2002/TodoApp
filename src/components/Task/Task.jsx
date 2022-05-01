import { motion } from "framer-motion/dist/framer-motion";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

import "./Task.css";

const Task = ({ isDone, topic, content, id }) => {
  const { deleteTask, selectDoneTask, setId } = useContext(TaskContext);

  return (
    <motion.div
      className="task"
      initial={{ x: "-100%", margin: 0 }}
      animate={{ x: 0, marginTop: 25 }}
      exit={{
        x: "-100%",
        marginTop: 0,
        height: 0,
        width: 0,
        padding: 0,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 10,
      }}
    >
      <span className={`task-line done-${isDone}`}></span>
      <div className="task__actions">
        <motion.button
          className="ball task__remove"
          whileTap={{ scale: 2 }}
          onClick={() => deleteTask(id)}
        />
        <motion.button
          className="ball task__edit"
          whileTap={{ scale: 2 }}
          onClick={() => setId(id)}
        />
        <motion.button
          className="ball task__done"
          whileTap={{ scale: 2 }}
          onClick={() => selectDoneTask(id)}
        />
      </div>
      <h4 className="task__title">{isDone ? <del>{topic}</del> : topic}</h4>
      <p className="task__content">{isDone ? <del>{content}</del> : content}</p>
    </motion.div>
  );
};

export default Task;
