import React, { useEffect, useState } from 'react';
import Section from './Section';

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