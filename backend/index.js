const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/tasks', (req, res) => {
    const { status } = req.query;
    let sql = 'SELECT * FROM tasks';
    const params = [];

    if (status && ['pending', 'completed'].includes(status)) {
        sql += ' WHERE status = ?';
        params.push(status);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tasks: rows });
    });
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ task: row });
    });
});

app.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !status) {
        res.status(400).json({ error: 'Title and status are required' });
        return;
    }
    const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
    const params = [title, description, status];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ task: { id: this.lastID, title, description, status } });
    });
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!title || !status) {
        res.status(400).json({ error: 'Title and status are required' });
        return;
    }
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    const params = [title, description, status, id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ message: 'Task updated successfully' });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
