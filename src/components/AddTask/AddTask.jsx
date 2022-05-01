import { motion } from "framer-motion/dist/framer-motion";
import { useContext, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import TaskContext from "../context/TaskContext";
import "react-toastify/dist/ReactToastify.css";
import "./AddTask.css";

const AddTask = () => {
  const { addTask } = useContext(TaskContext);
  const [text, setText] = useState({ topic: "", content: "" });
  const topicInputRef = useRef();
  const contentInputRef = useRef();

  const topicChangeHandler = (e) => {
    setText({ ...text, topic: e.target.value });
  };

  const contentChangeHandler = (e) => {
    setText({ ...text, content: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredContent = contentInputRef.current.value;

    if (enteredTopic.trim() === "" || enteredContent.trim() === "") {
      showErrorMessage();
    } else {
      addTask(text.topic, text.content);
    }

    setText({ topic: "", content: "" });
  };

  const showErrorMessage = () => {
    toast.error("Please fill the following form");
  };

  return (
    <div className="add-task">
      <ToastContainer />
      <div className="add-task__title">
        <img
          className="add-task__title__icon"
          src="./svg/add-task.svg"
          alt="Add Task Icon"
        />
        <h2 className="add-task__title__text">Make New Task</h2>
      </div>
      <form className="add-task__form" onSubmit={submitHandler}>
        <div>
          <p className="add-task__count">{text.topic.length}/50</p>
          <input
            maxLength={50}
            onChange={topicChangeHandler}
            className="input add-task__form__name"
            value={text.topic}
            ref={topicInputRef}
            type="text"
            placeholder="Your task topic"
          />
        </div>
        <div>
          <p className="add-task__count">{text.content.length}/100</p>
          <textarea
            maxLength={100}
            onChange={contentChangeHandler}
            className="input add-task__form__content"
            value={text.content}
            ref={contentInputRef}
            type="text"
            placeholder="More details about the task"
          />
        </div>
        <motion.button
          className="add-task__form__submit"
          type="submit"
          whileTap={{ scale: 0.9 }}
        >
          Create New Task
        </motion.button>
      </form>
    </div>
  );
};

export default AddTask;
