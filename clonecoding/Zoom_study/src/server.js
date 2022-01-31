import http from "http"; // ws
// import WebSocket from "ws";  // ws
import { Server, Socket } from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render('home'));
app.get("/*", (_, res) => res.redirect("/"));

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
function publicRooms() {
  //  const sids = wsServer.sockets.adapter.sids;
  //  const rooms = wsServer.sockets.adapter.rooms;
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_,key) => {
    if(sids.get(key) === undefined) {
      publicRooms.push(key)
    }
  });
  return publicRooms;
}

wsServer.on('connection', (socket) => {
  // wsServer.socketsJoin("announcement"); 강제로 방에 넣는 방법
  socket['nickname'] = `Guest${socket.id}`
  socket.onAny((event) => {
    console.log(`Soket Event : ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname);
    wsServer.sockets.emit("room_change" ,publicRooms());
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach(room =>
      socket.to(room).emit("bye", socket.nickname)
    );
    wsServer.sockets.emit("room_change" ,publicRooms());
  });
  socket.on("disconnet" , ()=> {
    wsServer.sockets.emit("room_change" ,publicRooms());
  })
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
    done();
  });
  socket.on("nickname", nickname => (socket["nickname"] = nickname));
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


httpServer.listen(3000, handleListen);