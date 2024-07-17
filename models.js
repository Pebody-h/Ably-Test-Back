const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

exports.createNumbersTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS numbers (
                id SERIAL PRIMARY KEY,
                value INTEGER NOT NULL
            );
        `);
        console.log("Tabla 'numbers' creada exitosamente.");
    } catch (err) {
        console.error(err);
    }
};

exports.insertNumber = async (value) => {
    try {
        await pool.query(
            `INSERT INTO numbers (value) VALUES ($1)`,
            [value]
        );
        console.log("Número insertado exitosamente.");
    } catch (err) {
        console.error(err);
    }
};