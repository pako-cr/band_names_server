const express = require('express');
const path = require('path');

require('dotenv').config();

// Express App
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

// Public Path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(`❌ Error found! Description: ${err}`);

    console.log(`✅ Server running on port ${process.env.PORT}...`)
});