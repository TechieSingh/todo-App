import React from 'react';

const TaskItem = ({ task, onDelete, onEdit }) => {
    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>
                <strong>Status:</strong> {task.status}
            </p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)} style={{ marginLeft: '5px' }}>
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
