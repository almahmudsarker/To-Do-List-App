import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './css/create.css'
const CreateTask = ({tasks, setTasks}) => {

    const [task, setTask] = useState({
      name: "",
      description: "",
      status: "todo",
    });


    const handleSubmit = (e) => {
      e.preventDefault();

      if (task.name.length < 3)
        return toast.error("Task name must be at least 3 characters long");

      if (task.name.length > 20)
        return toast.error("Task name must be at most 20 characters long");

      fetch("https://todolist-zf26.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((newTask) => {
          setTasks((prevTasks) => [...prevTasks, newTask]);
          toast.success("Task created successfully");
          setTask({
            name: "",
            description: "",
            status: "todo",
          });
        })
        .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
      setTask({
        ...task,
        name: e.target.value,
      });
    };


    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-80 h-14 mt-7"
          placeholder="Title"
          value={task.name}
          onChange={handleChange}
        />
        <textarea
          className="border border-gray-300 rounded-md px-4 py-2 w-80 mt-7 ml-2 h-14 align-top"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md ml-4 h-14 w-28"
        >
          Create
        </button>
      </form>
    );
};
export default CreateTask;