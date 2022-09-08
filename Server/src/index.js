require('./config/mongoDB');

const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const { Server } = require('socket.io');
const { chat } = require('./chat/index');
const  leagueRoutes  = require('./leagueStandings/routes/LeagueRoutes');
const { toEvent } = require('./chat/helper/SocketUtils');
require('./chat/service/MatchesService');
app.set(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// API-FootBall routes
app.use('', leagueRoutes)

//Web socket chat
chat(io);

process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection at:', err);
    toEvent('', { msg: `Unhandled Rejection: ${err}`, status: false });
});

process.on('uncaughtException', (err, origin) => {
    console.log(`Caught exception: ${err}`, ` origin: ${origin}`);
    toEvent('', { msg: `Caught exception: ${err}`, at: origin, status: false });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log('Connected');
})
