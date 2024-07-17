const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tableRoutes = require('./routes');
const Ably = require('ably');

const PORT = process.env.PORT || 3000;
const ABLY_API_KEY = process.env.ABLY_API_KEY;

const realtime = new Ably.Realtime(ABLY_API_KEY);

const app = express();

const channel = realtime.channels.get('data-sync');

module.exports = { channel };

app.use(express.json());
app.use(cors());

app.use('/', tableRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});