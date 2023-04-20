
const { ConnectionModel } = require("../models/chatModels");
module.exports = (io) => {
    try {
        let users = [];
        const addUser = (userId, socketId) => {

            try {
                !users.some((user) => user.userId === userId) &&
                    users.push({ userId, socketId, lastActive: Date.now() });
            } catch (error) {
                io.emit('error', { message: " sorry,something went wrong" });
            }
        };

        const getUser = (userId) => {
            return users.find((user) => user.userId == userId);
        };
        // updates user status
        const updateUserStatus = (userId, isActive) => {
            try {
                const user = getUser(userId);
                if (user) {
                    user.isActive = isActive;
                }

            } catch (error) {
                io.emit('error', { message: " sorry,something went wrong" });
            }
        };

        // send user online status
        const sendUserStatus = (senderId, receiverId) => {
            try {
                const user = getUser(receiverId);
                io.to(user.socketId).emit('userStatus', {
                    userId: senderId,
                    isActive: user.isActive
                });

            } catch (error) {
                io.emit('error', { message: " sorry,something went wrong" });
            }
        };

        // remove user from connection
        const removeUser = (socketId) => {
            users.filter((user) => user.socketId !== socketId);
        };

        // shows that the user is typing

        io.on('typing', ({ senderId, receiverId }) => {
            try {
                const user = getUser(receiverId);
                io.to(user.socketId).emit('typing', {
                    senderId
                });

            } catch (error) {
                io.emit('error', { message: " sorry,something went wrong" });
            }
        });

        io.on('connection', (socket) => {


            console.log("a user connected")
            socket.on('addUser', ({ userId }) => {
                addUser(userId, socket.id);
                io.emit('getUsers', users);
            })
            socket.on('sendMessage', ({ senderId, receiverId, text }) => {
                try {
                    console.log({ senderId, receiverId, text })
                    const user = getUser(receiverId);
                    updateUserStatus(senderId, true);
                    updateUserStatus(receiverId, true);

                    io.to(user.socketId).emit('getMessage', {
                        senderId,
                        text,
                    });
                    sendUserStatus(senderId, receiverId);
                    sendUserStatus(receiverId, senderId);

                } catch (error) {
                    io.emit('error', { message: " sorry,something went wrong" });
                }
            });
            socket.on('disconnect', () => {
                try {
                    console.log('a user disconnected!');
                    const user = users.find((user) => user.socketId === socket.id);

                    if (user) {
                        updateUserStatus(user.userId, false);
                        io.emit('getUsers', users);

                        sendUserStatus(user.userId, receiverId);
                        removeUser(socket.id);
                    }
                    // updateUserStatus(user.userId, false);
                    // io.emit('getUsers', users);
                } catch (error) {
                    io.emit('error', { message: " sorry,something went wrong" });
                }
            });
        });

    } catch (error) {
        console.error(`Error sending message: ${error}`);
        // handle the error
    }
}