import { toast } from "react-toastify";
import { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";

import "./PopUp.css";

const PopUp = () => {
  const [text, setText] = useState({ topic: "", content: "" });
  const { PopUp, setPopUp, editTask } = useContext(TaskContext);

  const submitHandler = (e, isOk) => {
    e.preventDefault();

    if (isOk) {
      toast.success("Task was successfully edited!");
      editTask(text);
    }

    setPopUp({ in: false, item: null });
    setText({ topic: "", content: "" });
  };

  const topicChangeHandler = (e) => {
    setText({ ...text, topic: e.target.value });
  };

  const contentChangeHandler = (e) => {
    setText({ ...text, content: e.target.value });
  };

  return (
    <div className={PopUp.in ? "pop-up pop-up-show" : "pop-up"}>
      <h4 className="pop-up__title">Edit your task</h4>
      <form onSubmit={(e) => submitHandler(e, true)}>
        <input
          className="pop-up__input"
          maxLength={50}
          placeholder={
            PopUp.item !== null
              ? `Edit topic for "${PopUp.item.topic}"`
              : "Nothing"
          }
          value={text.topic}
          onChange={topicChangeHandler}
          type="text"
        />
        <textarea
          className="pop-up__content"
          maxLength={100}
          placeholder="Edit content"
          value={text.content}
          onChange={contentChangeHandler}
        />
        <div className="pop-up__buttons">
          <button
            className="pop-up__button cancel"
            type="submit"
            onClick={(e) => submitHandler(e, false)}
          >
            Cancel
          </button>
          <button className="pop-up__button confirm" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopUp;
