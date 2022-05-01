import { useContext } from "react";
import TaskContext from "../context/TaskContext";

import "./OverLay.css";

const OverLay = (props) => {
  const { PopUp } = useContext(TaskContext);

  return (
    <div className={PopUp.in ? "over-lay show" : "over-lay"}>
      {props.children}
    </div>
  );
};

export default OverLay;
