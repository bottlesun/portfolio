import http from "http"; // ws
import WebSocket from "ws";  // ws
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use("/public" , express.static(__dirname + "/public"));
app.get("/" , (_,res) => res.render('home'));
app.get("/*" , (_,res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);


/* ws 구현 */
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection",(socket) =>{
    console.log("Connected to Browser ✔");
    //socket 에 있는 기능
    socket.on("close", ()=>  console.log("DisConected from Browser ❌"));
    socket.on("message" , message => {
        console.log(message.toString());
    })
    socket.send("hello!");
});

server.listen(3000,handleListen);
