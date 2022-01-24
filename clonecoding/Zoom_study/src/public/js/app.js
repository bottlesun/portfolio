const FrontSocket = new WebSocket(`ws://${window.location.host}`);


FrontSocket.addEventListener("open" , () => {
    console.log('Connected to Server ✔')
});

FrontSocket.addEventListener('message', (message) =>{
    console.log("New message : " , message.data, message.data);
});

FrontSocket.addEventListener('close', () => {
    console.log("DisConected from Sever ❌");
});

setTimeout(() => {
    FrontSocket.send("hello from the browser!");
}, 10000);