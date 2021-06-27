const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
let users = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // -----------------it listens to the event when a user joins a chat and the logic is written in socket.js file----------
    socket.on('join-chat', function (userName) {
        // an array of users is filled with all online users, whenever a user connects
        // we push it into the users array
        users.push({ id: socket.id, name: userName })
        socket.broadcast.emit('user-joined', userName);
    })

    // ---------------it listens to the event when a user sends a message and the logic is written in socket.js file--------------------
    socket.on('chat-send', function (userObj) {
        socket.broadcast.emit('receive-chat', userObj);
    })

    // ---------------it listens to the event when a user leaves the chat-----------------------
    socket.on('disconnect', function () {
        let userWhoLeft = users.filter((userObj) => {
            return userObj.id == socket.id
        });
        // userWhoLeft looks like => [{id: "something", name: "something"}]

        if (userWhoLeft) {
            socket.broadcast.emit('user-left', userWhoLeft[0].name);
        }

        // when a user leaves the chat we remove that particular user from the users array
        users = users.filter(function (userObj) {
            return userObj.id !== socket.id
        })
    })

    socket.on('radio', function (someObj) {
        // can choose to broadcast it to whoever you want
        let newObj = {
            "blob": someObj.blob,
            "name": someObj.userName
        }
        socket.broadcast.emit('voice', newObj);
    });


    // ------------------------ white board --------------------
    socket.on("md", (point) => {
        socket.broadcast.emit("md", point);
    })
    socket.on("mm", (point) => {
        socket.broadcast.emit("mm", point);
    })


});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

