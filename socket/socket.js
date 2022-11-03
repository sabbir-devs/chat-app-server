const io = require('socket.io')(process.env.PORT, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

let activeUsers = [];

io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        };
        console.log("Connect Users", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers)
    })
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

        console.log('user disconnected', activeUsers)
        // send all active users to all users
        io.emit("get-users", activeUsers)
    })
    // send message to a specific user
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to :", receiverId)
        console.log("Data: ", data)
        if (user) {
            io.to(user.socketId).emit("recieve-message", data);
        }
    });
})