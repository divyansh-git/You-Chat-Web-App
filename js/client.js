const socket=io("http://localhost:8000");

const form= document.getElementById('send-container');
const messageInput=document.getElementById('messageinput');
const messageContainer=document.querySelector('.container');
let v_noc=document.getElementById('noc');
var sound= new Audio("received.mp3");

function append(message,position){
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left")
    sound.play();

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You: ${message}`,"right");
    socket.emit('send',message);
    messageinput.value="";

})
const name= prompt("please enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined',(name)=>{
    append(`${name} joined the chat`,"right");
});

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,"left");
});
socket.on('user-left',name=>{
    append(`${name} left the chat`,"left");

});