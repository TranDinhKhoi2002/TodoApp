import { motion } from "framer-motion/dist/framer-motion";
import { useState } from "react";

import "./DropDown.css";

const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropDownHandler = () => {
    setIsOpen(!isOpen);
  };

  const changeDropDownHandler = (e) => {
    props.onChangeDropDown(e);
    openDropDownHandler();
  };

  return (
    <motion.div whileTap={{ scale: 0.9 }} className="drop-down">
      <button onClick={openDropDownHandler} className="drop-down__change">
        {props.type === "all" ? "All Task" : "Done Task"} <span>▼</span>
      </button>
      <div className={`drop-down__container ${isOpen && "show"}`}>
        <div
          className="drop-down__item"
          onClick={(e) => changeDropDownHandler(e)}
          data-catagory="all"
        >
          All Task
        </div>
        <div
          className="drop-down__item"
          onClick={(e) => changeDropDownHandler(e)}
          data-catagory="done"
        >
          Done Task
        </div>
      </div>
    </motion.div>
  );
};

export default DropDown;
