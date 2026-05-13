const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// to read from server path
app.use(express.static(path.join('client')));
app.use(bodyParser.urlencoded({ extended: false }));
///

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: '0.0.0.0',
    database: 'mydb',
    password: 'password',
    port: 5432,
});

// Fetch a specific user by ID
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            // User not found
            res.status(404).json({ message: `User with ID ${id} not found.` });
        } else {
            // User found
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a user's name and email by ID
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name,email, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add a new user
app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a user by ID
app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount > 0) {
            res.json({ message: `User with ID ${id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `User with ID ${id} not found.` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
