const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }

        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log(data);

            console.log(`User ${userId} updated location to ${location}`);
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalied location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location:{
                    type: 'Point',
                    coordinates: [location.lng, location.lat]
                }
            });
        });
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

function sentMessageToSocketId(socketId, messageObject) {
    console.log('Captain Socket Id:', socketId);
    if (io) { 
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not inetialized');
    }
}


module.exports = { initializeSocket, sentMessageToSocketId };