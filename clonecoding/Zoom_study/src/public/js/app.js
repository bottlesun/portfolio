const soket = io(); 


const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');

let myStream; 

async function getMedia(){
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
           {
               audio : false,
               video : true,
           });
        myFace.srcObject = myStream;
    } catch (e) {
        console.log(e);
    }
}

getMedia();
