import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ListTasks = ({tasks, setTasks}) => {

    const [todos, setTodos] = useState([])
    const [doings, setDoings] = useState([])
    const [dones, setDones] = useState([])

    useEffect(() => {
        const todos = tasks.filter((task) => task.status === 'todo');
        const doings = tasks.filter((task) => task.status === 'doing');
        const dones = tasks.filter((task) => task.status === 'done');
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

const Section = ({status, tasks, setTasks, todos, doings, dones}) => {
    let text = 'Todo';
    let bg = 'bg-rose-500';
    let tasksToMap = todos;

    if(status === 'doing') {
        text = 'Doing';
        bg = 'bg-cyan-500';
        tasksToMap = doings;
    }

    if(status === 'done') {
        text = 'Done';
        bg = 'bg-green-500';
        tasksToMap = dones;
    }

    return (
        <div className={`w-64`}>
           <Header text={text} bg={bg} count={tasksToMap.length}/> 
           {
               tasksToMap.length > 0 && tasksToMap.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)
           }   
        </div>
    );
}

const Header = ({text, bg, count}) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>{count}</div>
        </div>
    );
}

const Task = ({task, tasks, setTasks}) => {
    const handleRemove = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        toast('Task removed', {icon: '🗑️'});
    }
return (
  <div className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab`}>
    <p>{task.name}</p>
    <button className="absolute bottom-1 right-1 text-rose-400"
    onClick={() => handleRemove(task.id)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
);
};