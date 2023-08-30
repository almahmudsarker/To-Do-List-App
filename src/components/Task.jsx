import { useDrag } from "react-dnd";
import { toast } from "react-hot-toast";

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    fetch(`https://todolist-zf26.onrender.com/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newTasks = tasks.filter((t) => t._id !== id);
        setTasks(newTasks);
        toast("Task removed", { icon: "🗑️" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md ${
        isDragging ? "opacity-25" : "opacity-100"
      } rounded-md cursor-grab`}
    >
      <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
      <p className="text-gray-600">{task.description}</p>
      <button
        className="absolute bottom-1 right-1 text-rose-400"
        onClick={() => handleRemove(task._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Task;