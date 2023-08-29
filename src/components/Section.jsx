import { toast } from "react-hot-toast";
import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";

const Section = ({ status, tasks, setTasks, todos, doings, dones }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id, status), // Pass the new status
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = async (id, newStatus) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      // Update the state immediately
      setTasks(updatedTasks);

      console.log("Updated tasks after setTasks:", updatedTasks); // Add this line

      await fetch(`https://todolist-zf26.onrender.com/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      toast.success("Task moved", { icon: "👍" });
    } catch (error) {
      console.log(error);
    }
  };

  let text = "Todo";
  let bg = "bg-rose-500";
  let tasksToMap = todos;

  if (status === "doing") {
    text = "Doing";
    bg = "bg-cyan-500";
    tasksToMap = doings;
  }

  if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = dones;
  }

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""} `}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

export default Section;