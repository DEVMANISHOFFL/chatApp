import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
    },
});

const userSocketMap = {}; // {userId -> socketId}

let emitOnlineUsersTimeout; // Timeout for emitting online users

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users list periodically every 5 seconds
    if (emitOnlineUsersTimeout) {
        clearTimeout(emitOnlineUsersTimeout);
    }
    emitOnlineUsersTimeout = setTimeout(() => {
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }, 5000); // Emit every 5 seconds

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit immediately on disconnect
    });
});

export { app, io, server };
