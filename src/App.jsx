import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, [])


  return (
    <>
      <Toaster />
      <div className="bg-gray-100 w-screen h-screen flex flex-col items-center pt-32 gap-16">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
};

export default App;
