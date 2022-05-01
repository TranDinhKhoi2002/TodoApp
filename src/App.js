import Header from "./components/Header/Header";
import { TaskProvider } from "./components/context/TaskContext";
import PopUp from "./components/PopUp/PopUp";
import OverLay from "./components/OverLay/OverLay";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/AddTask/AddTask";

function App() {
  return (
    <TaskProvider>
      <OverLay />
      <PopUp />
      <Header />
      <div className="container">
        <AddTask />
        <Tasks />
      </div>
    </TaskProvider>
  );
}

export default App;
