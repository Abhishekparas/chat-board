$(document).ready(() => {
    $(".chat-box").perfectScrollbar();
});

// let name = prompt("enter your name")
let userName;

$("#send").click(function () {
    chatName = userName;
    let chatMessage = $("#chat-input").val();
    let ele = $(
        `<div class="chat right">
            <div class="chat-name">${chatName}</div>
            <div class="chat-text">${chatMessage}</div>
        </div>`
    );
    if (chatMessage) {
        // since we want every connected user to know who typed the message therefore we have to fire a chat-send event
        // from here and send the userName and chatMessage along with it
        socket.emit('chat-send', { userName, chatMessage });
        $(".chat-box").append(ele);
        // every time we type a message the scrollbar will move to the bottom
        $(".chat-box").scrollTop($(".chat-box")[0].scrollHeight);
    }
    $("#chat-input").val("");
});

$(".join-chat").click(function () {
    userName = $("#user-name").val();
    if (userName) {
        // since we want every eonnected user to know who joined the chat therefore we have to fire a join-chat event
        // from here and send the userName along with it
        socket.emit('join-chat', userName);
        $(".user-name-input").addClass("hide");
        $(".chat-content").removeClass("hide");
    }
});

var constraints = { audio: true };

$(".audio-btn").click(function () {
    alert("Speak in the mic for 10 sec");
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        var mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.onstart = function (e) {
            this.chunks = [];
        };
        mediaRecorder.ondataavailable = function (e) {
            this.chunks.push(e.data);
        };
        mediaRecorder.onstop = function (e) {
            var blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
            socket.emit('radio', { blob, userName });
        };

        // Start recording
        mediaRecorder.start();

        // Stop recording after 10 seconds and broadcast it to server
        setTimeout(function () {
            mediaRecorder.stop()
        }, 5000);
    });
})