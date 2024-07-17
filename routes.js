const express = require('express');
const router = express.Router();
const { createNumbersTable, insertNumber } = require('./models');
const { channel } = require('./server'); 

router.post('/create-table', async (req, res) => {
    try {
        await createNumbersTable();
        channel.publish('table-created', JSON.stringify({ message: 'Tabla creada con éxito.' }));
        res.send('Tabla creada con éxito.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/insert-number', async (req, res) => {
    try {
        const { value } = req.body;
        if (!value) {
            return res.status(400).send('Debe proporcionar un valor.');
        }
        await insertNumber(value);
        channel.publish('number-created', JSON.stringify({ message: 'Número insertado con éxito.' }));
        res.send('Número insertado con éxito.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/get-numbers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM numbers');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;