// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit, refresh }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, [refresh]);

    const fetchTasks = () => {
        axios
            .get('http://localhost:5000/tasks')
            .then((res) => setTasks(res.data.tasks))
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/tasks/${id}`)
            .then(() => fetchTasks())
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Tasks</h2>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onDelete={handleDelete} onEdit={onEdit} />
                ))
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};

export default TaskList;
