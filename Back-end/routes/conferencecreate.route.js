const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/create', (req, res) => {
    const { name, date, speakers, description } = req.body;

    if (!name || !date || !speakers || !description) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `
        INSERT INTO conferences (name, date, speakers, description)
        VALUES (?, ?, ?, ?)
    `;
    pool.query(query, [name, date, speakers, description], (err, results) => {
        if (err) {
            console.error('Error inserting into conferences:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: 'Conference created successfully!', conferenceId: results.insertId });
    });
});

module.exports = router;
