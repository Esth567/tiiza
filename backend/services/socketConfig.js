
module.exports = (io) => {

    let users = [];
    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
    };

    const getUser = (userId) => {
        return users.find((user) => user.userId == userId);
    };
    const removeUser = (socketId) => {
        users.filter((user) => user.socketId !== socketId);
    };

    io.on('connection', (socket) => {
        console.log("a user connected")
        socket.on('addUser', ({ userId }) => {
            addUser(userId, socket.id);
            io.emit('getUsers', users);
        })
        socket.on('sendMessage', ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text,
            });
        });
        socket.on('disconnect', () => {
            console.log('a user disconnected!');
            removeUser(socket.id);
            io.emit('getUsers', users);
        });
    });
}