const objects = [
    { id: 'objeto1', imagen: 'url(./img/ballena.jpg)' },
    { id: 'objeto2', imagen: 'url(./img/loro.jpg)' },
    { id: 'objeto3', imagen: 'url(./img/sapo.jpg)' },
    { id: 'objeto4', imagen: 'url(./img/gatito.jpg)', },
];
let inGame = false;
let blockClick = false;
let pieceInGame;
let play = true;



document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.piece');
    if (!pieces.length) {
        console.error("Error: No se encontraron elementos con la clase 'piece'");
        return;
    }

    const assignImg = () => {
        let duplicateObjects = [...objects, ...objects]
            .sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
           
        duplicateObjects.forEach((objeto, index) => {
            if (pieces[index]) {
                pieces[index].dataset.imagen = objeto.imagen;
                pieces[index].dataset.objetoId = objeto.id;
            }
        });
    };
        jugar();
        assignImg(); 
        getEquals();
    
    // Llamamos la función dentro de DOMContentLoaded
});

function getEquals(){
    const pieces = document.querySelectorAll('.piece');

    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            if(blockClick === true) return;

            if(inGame === false){
                showPiece(piece);
                inGame = true;
                pieceInGame = piece;
            }
            else{
                showPiece(piece);
                if(pieceInGame.dataset.objetoId === piece.dataset.objetoId){
                    piece.dataset.win = 'true';
                    pieceInGame.dataset.win = 'true';
                    verifyWin();
                    inGame = false;
                    pieceInGame = null;
                }
                else{
                    blockClick = true;

                    setTimeout(() => {
                        hiddenPiece(pieceInGame,piece)
                        pieceInGame = null;
                        inGame = false;
                        blockClick = false
                    }, 1000);
                    

                }
            }
        });
});
}

function showPiece(piece){
    piece.style.backgroundImage = piece.dataset.imagen;
}

function hiddenPiece(piece, piece2){
    piece.style.backgroundImage = 'none';
    piece2.style.backgroundImage = 'none';
}

const verifyWin = () => {
    const pieces = document.querySelectorAll('.piece');
    let win = 0;
    pieces.forEach(piece => {
        if(piece.dataset.win === 'true'){
            win += 1;
        }
    });
    if(win === 8){
        alert('Ganaste');
        document.getElementById("restartButton").style.display = "block";
        restart();
    }
}

const jugar = () => {
    document.getElementById("playButton").addEventListener("click", () => {
        document.getElementById("overlay").style.display = "none";
    });
}

const restart = () => {
    document.getElementById("restartButton").addEventListener("click", () => {
        // Resetear el estado del juego
        inGame = false;
        blockClick = false;
        pieceInGame = null;
        play = true;

        // Ocultar las piezas y el botón de reinicio
        document.querySelectorAll('.piece').forEach(piece => {
            piece.style.backgroundImage = 'none';
            piece.dataset.win = ''; // Limpiar el estado de la victoria
        });

        document.getElementById("restartButton").style.display = "none";

        // Volver a asignar las imágenes y barajar
        assignImg();

        // Opcional: Reiniciar la lógica del juego, como el contador de victorias
        getEquals();
    });
}