const soket = io(); // back-end 와 연결 해줌


const welcome = document.getElementById('welcome');
const form = welcome.querySelector("form");
const room = document.getElementById('room');

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li")
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(e){
    e.preventDefault();
    const input = room.querySelector('#msg input');
    const value = input.value;
    soket.emit('new_message', input.value , roomName , ()=>{
        addMessage(`You : ${value}`);
    });
    input.value = ""

}

function handleNickNameSubmit(e){
    e.preventDefault();
    const input = room.querySelector('#name input');
    soket.emit("nickname" , input.value);
}

function showRoom(){
   welcome.hidden = true;
   room.hidden = false;
   const h3 = room.querySelector("h3");
   h3.innerText =  `Room :${roomName}`;
   const msgForm = room.querySelector('#msg');
   const nameForm = room.querySelector('#name');
   msgForm.addEventListener('submit',handleMessageSubmit);
   nameForm.addEventListener('submit',handleNickNameSubmit);
}

function handleRoomSubmit(e) {
    e.preventDefault();
    const input = form.querySelector('input');
    soket.emit("enter_room" , input.value ,  showRoom );
    roomName = input.value;
    input.value = "";
}

form.addEventListener('submit', handleRoomSubmit);

soket.on("welcome" , (nickname , newCount)=>{
    const h3 = room.querySelector("h3");
    h3.innerText =  `Room :${roomName} (${newCount})`;
    addMessage(`${nickname} 님께서 입장 하셨습니다.`);
});

soket.on('bye',(nickname , newCount)=>{
    const h3 = room.querySelector("h3");
    h3.innerText =  `Room :${roomName} (${newCount})`;
    addMessage(`${nickname} 님께서 퇴장 하셨습니다.`);
})

soket.on('new_message' , addMessage);

soket.on('room_change' ,(rooms) => {
  const roomList = welcome.querySelector('ul');

    if(rooms.length === 0) {
        roomList.innerHTML = "";
        return;
    }
    rooms.forEach((room) => {
        const li = document.createElement('li');
        li.innerText = room;
        roomList.append(li);
    });
});


/* WebSocket 
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
*/