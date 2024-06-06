const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = require('./db/koneksi');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Mendapatkan semua todos
app.get('/api/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mendapatkan satu todo berdasarkan id
app.get('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
        
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Membuat todo baru
app.post('/api/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        await pool.query('INSERT INTO todos (title, description) VALUES ($1, $2)', [title, description]);
        
        res.status(201).json({ message: 'Data inserted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mengedit todo
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await pool.query('UPDATE todos SET title = $1, description = $2 WHERE id = $3', [title, description, id]);
        
        res.status(200).json({ message: 'Data updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Menghapus todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        
        res.status(200).json({ message: 'Data deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

if (require.main === module) {
    app.listen(5000, () => console.log('Server running on port 5000'));
}

module.exports = app;
