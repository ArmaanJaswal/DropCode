import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const rooms = new Map();

const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

io.on("connection", (socket) => {

    console.log("Socket connected:", socket.id);

    // CREATE ROOM
    socket.on("create-room", (peerId) => {

        const roomCode = generateCode();

        rooms.set(roomCode, {
            socketId: socket.id,
            peerId: peerId
        });

        socket.join(roomCode);

        console.log("Room created:", roomCode);

        socket.emit("room-code", roomCode);
    });


    
    socket.on("join-room", ({ roomCode, peerId }) => {

        const room = rooms.get(roomCode);

        if (!room) {
            socket.emit("room-error", "Room does not exist");
            return;
        }

        const roomSize =
            io.sockets.adapter.rooms.get(roomCode)?.size || 0;

        if (roomSize >= 2) {
            socket.emit("room-error", "Room is full");
            return;
        }

        socket.join(roomCode);

        
        socket.emit("owner-peer-id", room.peerId);

        
        socket.to(roomCode).emit("peer-joined", peerId);

        console.log("User joined room:", roomCode);
    });

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});