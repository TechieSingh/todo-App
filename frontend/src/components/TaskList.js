import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios
            .get('http://localhost:5000/tasks')
            .then((res) => setTasks(res.data.tasks))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/tasks/${id}`)
            .then(() => fetchTasks())
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Tasks</h2>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={handleDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default TaskList;
