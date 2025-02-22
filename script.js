const objects = [
  { id: "objeto1", imagen: "./img/ballena.jpg" },
  { id: "objeto2", imagen: "./img/loro.jpg" },
  { id: "objeto3", imagen: "./img/sapo.jpg" },
  { id: "objeto4", imagen: "./img/gatito.jpg" },
];

let gameState = {
  inGame: false,
  blockClick: false,
  pieceInGame: null,
  play: true,
};

document.addEventListener("DOMContentLoaded", () => {
  initGame();
  setupPlayButton();
  setupRestartButton();
});

const initGame = () => {
  const pieces = document.querySelectorAll(".piece");
  if (!pieces.length) {
    console.error("Error: No se encontraron elementos con la clase 'piece'");
    return;
  }

  resetBoard(pieces);
  assignImages(pieces);
  assignClickEvents(pieces);
};

const assignImages = (pieces) => {
  const shuffledObjects = [...objects, ...objects].sort(() => Math.random() - 0.5);
  
  shuffledObjects.forEach((objeto, index) => {
    if (pieces[index]) {
      pieces[index].innerHTML = `<img src='${objeto.imagen}' />`;
      pieces[index].dataset.objetoId = objeto.id;
    }
  });
};

const assignClickEvents = (pieces) => {
  pieces.forEach((piece) => {
    piece.replaceWith(piece.cloneNode(true));
  });

  document.querySelectorAll(".piece").forEach((piece) => {
    piece.addEventListener("click", () => handlePieceClick(piece));
  });
};

const handlePieceClick = (piece) => {
  if (gameState.blockClick) return;

  if (!gameState.inGame) {
    showPiece(piece);
    gameState.inGame = true;
    gameState.pieceInGame = piece;
  } else {
    showPiece(piece);
    checkMatch(piece);
  }
};

const checkMatch = (piece) => {
  if (gameState.pieceInGame && gameState.pieceInGame.dataset.objetoId === piece.dataset.objetoId) {
    piece.dataset.win = "true";
    gameState.pieceInGame.dataset.win = "true";
    verifyWin();
    gameState.blockClick = false;
    gameState.inGame = false;
    gameState.pieceInGame = null;
  } else {
    gameState.blockClick = true; // Bloqueamos clics mientras se da vuelta la carta

    setTimeout(() => {
      hidePiece(piece);
      hidePiece(gameState.pieceInGame);
      gameState.blockClick = false;
      gameState.inGame = false;
      gameState.pieceInGame = null;
    }, 1000);
  }

  
};


const verifyWin = () => {
  const pieces = document.querySelectorAll(".piece");
  const matchedPieces = [...pieces].filter(piece => piece.dataset.win === "true");
  
  if (matchedPieces.length === pieces.length) {
    alert("¡Ganaste!");
    document.getElementById("restartButton").style.display = "block";
  }
};

const showPiece = (piece) => {
  piece.classList.remove("piece-hidden");
  piece.classList.add("piece-show");
};

const hidePiece = (piece) => {
  piece?.classList.remove("piece-show");
  piece?.classList.add("piece-hidden");
};

const resetBoard = (pieces) => {
  pieces.forEach((piece) => {
    piece.innerHTML = "";
    piece.dataset.win = "";
    piece.dataset.objetoId = "";
    hidePiece(piece);
  });
};

const setupPlayButton = () => {
  document.getElementById("playButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
  });
};

const setupRestartButton = () => {
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", restartGame);
};

const restartGame = () => {
  Object.assign(gameState, { inGame: false, blockClick: false, pieceInGame: null, play: true });
  document.getElementById("restartButton").style.display = "none";
  initGame();
};
