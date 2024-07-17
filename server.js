const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tableRoutes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', tableRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});