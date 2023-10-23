var socket = io();
var symbol;
$(function () {
  $(".board button").attr("disabled", true);
  $(".board> button").on("click", makeMove);

  socket.on("move.made", function (data) {

    $("#" + data.position).text(data.symbol);


    myTurn = data.symbol !== symbol;


    if (!isGameOver()) {
      if (gameTied()) {
        $("#messages").text("Match Nul!").addClass("match-nul");
        $(".board button").attr("disabled", true);
        $(".card").addClass("nul");
        $(".blob, .blob2").hide(); 
    } else {
        renderTurnMessage();
    }
    

    } else {

      if (myTurn) {
        $("#messages").text("Game over. Tu as perdu!");
        $(".card").addClass("defaite");


      } else {
        $("#messages").text("Youpi. Tu as gagné!");
        $(".card").addClass("victory");
      }

      $(".board button").attr("disabled", true);
      $(".blob, .blob2").hide(); 
    }
  });


  socket.on("game.begin", function (data) {

    symbol = data.symbol;

    myTurn = symbol === "X";
    renderTurnMessage();
  });


  socket.on("opponent.left", function () {
    $("#messages").text("Ton adversaire a quitté la partie :(");
    $(".board button").attr("disabled", true);
  });
  
});

function getBoardState() {
  var obj = {};

  $(".board button").each(function () {
    obj[$(this).attr("id")] = $(this).text() || "";
  });
  return obj;
}

function gameTied() {
  var state = getBoardState();

  if (
    state.a0 !== "" &&
    state.a1 !== "" &&
    state.a2 !== "" &&
    state.b0 !== "" &&
    state.b1 !== "" &&
    state.b2 !== "" &&
    state.b3 !== "" &&
    state.c0 !== "" &&
    state.c1 !== "" &&
    state.c2 !== ""
  ) {
    return true;
  }
}

function isGameOver() {
  var state = getBoardState(),

    matches = ["XXX", "OOO"],

    rows = [
      state.a0 + state.a1 + state.a2,
      state.b0 + state.b1 + state.b2,
      state.c0 + state.c1 + state.c2,
      state.a0 + state.b1 + state.c2,
      state.a2 + state.b1 + state.c0,
      state.a0 + state.b0 + state.c0,
      state.a1 + state.b1 + state.c1,
      state.a2 + state.b2 + state.c2,
    ];


  for (var i = 0; i < rows.length; i++) {
    if (rows[i] === matches[0] || rows[i] === matches[1]) {
      return true;
    }
  }
}

function renderTurnMessage() {
  var messagesElement = $("#messages");
  var boardButtons = $(".board button");

  if (!myTurn) {
      messagesElement.text("Au tour de ton adversaire");
      messagesElement.removeClass("your-turn").addClass("opponent-turn");
      boardButtons.attr("disabled", true);
  } else {
      messagesElement.text("A ton tour !");
      messagesElement.removeClass("opponent-turn").addClass("your-turn");
      boardButtons.removeAttr("disabled");
  }
}


function makeMove(e) {
  e.preventDefault();

  if (!myTurn) {
    return;
  }

  if ($(this).text().length) {
    return;
  }


  socket.emit("make.move", {
    symbol: symbol,
    position: $(this).attr("id"),
  });
}

function reloadPage() {
  location.reload(); // Recharge la page
}

// Écoutez l'événement "reload" depuis le serveur
socket.on('reload', () => {
  // Rechargez la page lorsque l'événement est reçu
  reloadPage();
});

// Écoutez le clic sur le bouton de rechargement
const reloadButton = document.getElementById('reloadButton');
reloadButton.addEventListener('click', () => {
  // Émettez un événement WebSocket pour demander le rechargement
  socket.emit('reload');
});
