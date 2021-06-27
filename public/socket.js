// ---------------------logic when a user joins a chat---------------------------------
socket.on('user-joined', function (userName) {
    let joinDiv = $(`<div class="chat join">${userName} joined the chat</div>`);
    $(".chat-box").append(joinDiv);
})

// ------------------------logic when a user sends a message-----------------------------
socket.on('receive-chat', function (userObj) {
    let leftDiv = $(
        `<div class="chat left">
            <div class="chat-name">${userObj.userName}</div>
            <div class="chat-text">${userObj.chatMessage}</div>
        </div>`
    );
    $(".chat-box").append(leftDiv);
});

// -------------------- logic when a user leaves the chat --------------------------
socket.on('user-left', function (userName) {
    let leaveDiv = $(`<div class="chat leave">${userName} left the chat</div>`);
    $(".chat-box").append(leaveDiv);
})



// When the client receives a voice message it will play the sound
socket.on('voice', function (newObj) {
    let arrayBuffer = newObj.blob;
    let name = newObj.name;
    var blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' });
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(blob);
    let audioDiv = $(`<div class="chat aud">${name} sent an audio</div>`)
    $(".chat-box").append(audioDiv);
    alert("Audio is starting to play");
    audio.play();
});