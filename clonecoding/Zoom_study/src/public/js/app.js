const soket = io(); 


const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');

let myStream; 
let muted = false;
let cameraOff = false;


async function getMedia(){
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
           {
               audio : true,
               video : true,
           });
        myFace.srcObject = myStream;
    } catch (e) {
        console.log(e);
    }
}

getMedia();0

function handleMuteClick(){
   console.log(myStream.getAudioTracks())
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    } else{
        muteBtn.innerText = "Mute";
        muted = false; 
    }
    
}
function handleCameraClick(){
    if(cameraOff){
        cameraBtn.innerText = "Turn Camera Off"
        cameraOff = false;
    } else {
        cameraBtn.innerText = "Turn Camera On"
        cameraOff = true;
    }
}
muteBtn.addEventListener('click' ,handleMuteClick);
cameraBtn.addEventListener('click',handleCameraClick);