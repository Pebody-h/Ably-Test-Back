const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tableRoutes = require('./routes');
const Ably = require('ably');

const PORT = process.env.PORT || 3000;
const ABLY_API_KEY = process.env.ABLY_API_KEY;

const ably = new Ably.Realtime(ABLY_API_KEY);

const app = express();


const channelName = 'data-sync';

let channel = ably.channels.get(channelName);
if (!channel) {
    channel = ably.channels.create(channelName);
}


app.use(express.json());
app.use(cors());

app.use('/', tableRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});