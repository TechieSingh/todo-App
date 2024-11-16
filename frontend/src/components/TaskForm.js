// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ taskToEdit, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setStatus(taskToEdit.status);
        } else {
            resetForm();
        }
    }, [taskToEdit]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStatus('pending');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, status };

        if (taskToEdit) {
            // Update existing task
            axios
                .put(`http://localhost:5000/tasks/${taskToEdit.id}`, task)
                .then(() => {
                    onSuccess();
                    resetForm();
                })
                .catch((err) => console.error(err));
        } else {
            // Create new task
            axios
                .post('http://localhost:5000/tasks', task)
                .then(() => {
                    onSuccess();
                    resetForm();
                })
                .catch((err) => console.error(err));
        }
    };

    const handleCancel = () => {
        resetForm();
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{taskToEdit ? 'Edit Task' : 'Create Task'}</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit">{taskToEdit ? 'Update' : 'Create'}</button>
            {taskToEdit && <button onClick={handleCancel}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
