const socket = io();

const button_chat = document.getElementById('button_chat');
const chatbox = document.getElementById('chatbox');
const chat_list = document.getElementById('chat_list');

button_chat.addEventListener('click', function(evento) {
    socket.emit('chat:', { //emitiendo
        messagge: chatbox.value
    })
    $('#chatbox').value() = '';
    evento.preventDefault();
});

socket.on('chat:', function(data) { //escuchando
    chat_list.innerHTML += `
        <p>
            <strong>${data.messagge}</strong>
        </p>
    
    `;
});