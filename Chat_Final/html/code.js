(function() {
  const app = document.querySelector(".app");
  const socket = io();

  let uname;

  app.querySelector(".join-screen #join-user").addEventListener("click", function() {
    let username = app.querySelector(".join-screen #username").value;
    if (username.length === 0) {
      return;
    }
    socket.emit("newuser", username);
    uname = username;
    app.querySelector(".join-screen").classList.remove("active");
    app.querySelector(".chat-screen").classList.add("active");
  });

  app.querySelector(".chat-screen #send-message").addEventListener("click", function() {
    let message = app.querySelector(".chat-screen #message-input").value;
    if (message.length === 0) {
      return;
    }
    renderMessage("my", {
      username: uname,
      text: message
    });
    socket.emit("chat", {
      username: uname,
      text: message
    });

    app.querySelector(".chat-screen #message-input").addEventListener("keydown", function(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
    
    app.querySelector(".chat-screen #message-input").value = '';
  });

  app.querySelector(".chat-screen #exit-chat").addEventListener("click", function() {
    socket.emit("exituser", uname);
    window.location.href = window.location.href;
  });

  socket.on("update", function(update) {
    renderMessage("update", update);
  });

  socket.on("chat", function(message) {
    renderMessage("other", message); // "other" au lieu de "update" pour les messages de chat entrants
  });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (type === "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my-message");
      el.innerHTML = `
        <div>
          <div class="name">Moi</div>
          <div class="text">${message.text}</div>
        </div>
      `;
      messageContainer.appendChild(el);
    } else if (type === "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
        <div>
          <div class="name">${message.username}</div>
          <div class="text">${message.text}</div>
        </div>
      `;
      messageContainer.appendChild(el);
    } else if (type === "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
  }
})();

function tictactoe(){
    // URL du lien que vous souhaitez ouvrir dans le popup
    var url = 'http://localhost:5001';                          // MODIFIER AVEC VOTRE ADRESSE IP ICI.
  
    // Spécifiez la taille et les options du popup
    var options = 'width=1000,height=1000,scrollbars=yes';
  
    // Ouvrez le lien dans un nouveau popup
    window.open(url, '_blank', options);
};

