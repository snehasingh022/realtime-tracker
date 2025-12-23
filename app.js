const express = require('express');
const app = express();
const http = require('http');
const path = require('path');


const socket = require('socket.io'); //soket io requies http server
const server = http.createServer(app);
const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    socket.on('send-Location', function(data) {
        io.emit('receive-Location', {id: socket.id, latitude: data.latitude, longitude: data.longitude});
    });
    socket.on('disconnect', function() {
        io.emit('user-disconnected', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000);