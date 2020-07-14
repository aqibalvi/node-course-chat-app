const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app)
let io = socketIO(server);

let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    

    socket.on('join', (params, callback) => {
         if(!isRealString(params.name) || !isRealString(params.room))
         {
             return callback('Name and room name are required.');
         }

         socket.join(params.room);
         users.removeUser(socket.id); //remove the before adding if already exist.
         users.addUser(socket.id, params.name, params.room); // adding user to user list
         // socket.leave('The office Fans');

         // io.emit  send all users
         // socket.broadcast.emit all connected user, except itself
         // socket.emit specifically to one user
         // socket.broadcast.to('myRoom').emit, will send the message to everybody present i myRoom except itself
         // io.to('myRoom').emit this will send to all connected user located in myRoom
         
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

         callback();
    });

    socket.on('sendMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text))
        {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('This is from the server');

    });
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));

        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id); // return removed user

        if(user)
        {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //show update list
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`)); //print message
        }

    });
});
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
