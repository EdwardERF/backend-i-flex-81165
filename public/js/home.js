// iniciamos la conexion desde el lado del cliente.
/* Esto funciona porque en el archivo home.handlebars tambien se esta llamando al script de node_modules: socket.io */
const socket = io();

// emitir evento
// socket.emit("new message", { message: "Saludos desde el cliente" });

// capturamos evento de historial de mensajes
socket.on("message history", (messages) => {
  const chatBox = document.getElementById('chatBox');
  messages.forEach(dataMessage => {
    const p = document.createElement("p");
    p.textContent = `${dataMessage.username} - ${dataMessage.message}`;
    chatBox.appendChild(p);
  });
});

// formulario
const formChat = document.getElementById('formChat');
const inputChat = document.getElementById('inputChat');
const inputUsername = document.getElementById('inputUsername');

formChat.addEventListener("submit", (event)=> {
  event.preventDefault();

  const message = inputChat.value;
  const username = inputUsername.value;
  
  inputChat.value = "";

  // emitimos evento de nuevo mensaje al servidor
  socket.emit("new message", { message, username });

});

//capturamos los mensajes nuevos
socket.on("broadcast new message", (dataMessage)=> {
  //insertar el nuevo mensaje en el html
  const chatBox = document.getElementById('chatBox');
  const p = document.createElement("p");
  p.textContent = `${dataMessage.username} - ${dataMessage.message}`;
  chatBox.appendChild(p);
});