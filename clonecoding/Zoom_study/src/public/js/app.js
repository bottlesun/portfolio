const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const FrontSocket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type,payload) {
    const msg = {type , payload}
    return JSON.stringify(msg);
}


function handleOpen() {
    console.log('Connected to Server ✔')
}

FrontSocket.addEventListener("open" , handleOpen );

FrontSocket.addEventListener('message', (message) =>{
    const li = document.createElement("li");
    li.innerText = `YOU : ${input.value}`;
    messageList.appendChild(li);
});

FrontSocket.addEventListener('close', () => {
    console.log("DisConected from Sever ❌");
});


function hendleSubmit (e) {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    FrontSocket.send(makeMessage("new_message" , input.value));
    input.value = "";
};

function hendleNickSubmit (e) {
    e.preventDefault();
    const input = nickForm.querySelector("input");
    FrontSocket.send(makeMessage("nickname" , input.value));
};

messageForm.addEventListener("submit" , hendleSubmit);
nickForm.addEventListener('submit' , hendleNickSubmit)