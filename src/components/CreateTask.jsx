import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {v4 as uuidv4} from 'uuid';
const CreateTask = ({tasks, setTasks}) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: 'todo', // todo, doing, done
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(task.name.length < 3) return toast.error('Task name must be at least 3 characters long');

        if(task.name.length > 20) return toast.error('Task name must be at most 20 characters long');

        setTasks((prev) => {
            const list = [...prev, task];
            // save to local storage
            localStorage.setItem('tasks', JSON.stringify(list));
            return list;
        })
        toast.success('Task created successfully');
        setTask({
            id: "",
            name: "",
            status: 'todo',
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-80" 
            value={task.name}
            onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})} />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-4">Create</button>
        </form>
    );
};
export default CreateTask;