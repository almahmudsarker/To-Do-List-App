import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { toast } from 'react-hot-toast';

const ListTasks = ({tasks, setTasks}) => {

    const [todos, setTodos] = useState([])
    const [doings, setDoings] = useState([])
    const [dones, setDones] = useState([])

   useEffect(() => {
     const todos = tasks.filter((task) => task.status === "todo");
     const doings = tasks.filter((task) => task.status === "doing");
     const dones = tasks.filter((task) => task.status === "done");
     setTodos(todos);
     setDoings(doings);
     setDones(dones);
   }, [tasks]);



    const statuses = ['todo', 'doing', 'done']

    return (
        <div className='flex gap-16'>
            {statuses.map((status, index) => (
                <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} doings={doings} dones={dones} />
            ))}
        </div>
    );
};

export default ListTasks;

// Path: src\components\here..........

// section component
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

// header component
const Header = ({text, bg, count}) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>{count}</div>
        </div>
    );
}

// task component
const Task = ({task, tasks, setTasks}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item: { id: task._id }, // Assuming your task object has an _id field from MongoDB
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));


    const handleRemove = (id) => {
      fetch(`https://todolist-zf26.onrender.com/tasks/${id}`, {
        method: "DELETE", // Use the DELETE method for removal
      })
        .then(() => {
          const newTasks = tasks.filter((t) => t._id !== id);
          setTasks(newTasks);
          toast("Task removed", { icon: "🗑️" });
        })
        .catch((error) => console.log(error));
    };

return (
  <div ref={drag} className={`relative p-4 mt-8 shadow-md ${isDragging ? 'opacity-25' : 'opacity-100'} rounded-md cursor-grab`}>
    <p>{task.name}</p>
    <button className="absolute bottom-1 right-1 text-rose-400"
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