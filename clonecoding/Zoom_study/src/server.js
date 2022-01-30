import http from "http"; // ws
// import WebSocket from "ws";  // ws
import { Server, Socket } from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use("/public" , express.static(__dirname + "/public"));
app.get("/" , (_,res) => res.render('home'));
app.get("/*" , (_,res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);


/* ws 구현 */
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

/*  ws 구현 
const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("DisConected from Browser ❌")
}
*/


wsServer.on('connection', socket => {
  socket.on('enter_room', (roomName, done) =>{
    console.log(roomName);
    setTimeout(()=>{
      done("hello from the backend");
    },10000)
  }, 15000);
});

/* websocket code 
const sockets = [];

wss.on("connection",(socket) =>{
    sockets.push(socket);
    socket["nickname"] = "Anon"; 
    console.log("Connected to Browser ✔");

    //socket 에 있는 기능
    socket.on("close", onSocketClose);
    socket.on("message" , (msg) => {
        const message = JSON.parse(msg.toString());
        switch(message.type){
          case "new_message" :
            sockets.forEach((aSocket) =>  aSocket.send(`${socket.nickname} : ${message.payload}`));        
          case "nickname" :
            socket["nickname"] = message.payload;
        }
    });
});
*/


httpServer.listen(3000,handleListen);