import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "./components/Modal";
import './components/css/app.css'

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://todolist-zf26.onrender.com/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-gray-100 w-screen h-screen flex flex-col p-3 items-center pt-32 gap-16">
        <h1 className="text-4xl font-bold text-gray-700">
          Kanban Board Task Management
        </h1>
        <Modal />
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
