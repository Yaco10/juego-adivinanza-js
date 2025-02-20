const objects = [
    { id: 'objeto1', imagen: 'url(./img/ballena.jpg)' },
    { id: 'objeto2', imagen: 'url(./img/loro.jpg)' },
    { id: 'objeto3', imagen: 'url(./img/sapo.jpg)' },
    { id: 'objeto4', imagen: 'url(./img/gatito.jpg)', },
];
let inGame = false;
let pieceInGame;

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

    assignImg(); 
    getEquals();// Llamamos la función dentro de DOMContentLoaded
});

function getEquals(){
    const pieces = document.querySelectorAll('.piece');

    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            if(inGame === false){
                console.log('en si');
                showPiece(piece);
                inGame = true;
                pieceInGame = piece;
            }
            else{
                console.log('en no');
                showPiece(piece);
                if(pieceInGame.dataset.objetoId === piece.dataset.objetoId){
                    console.log('ganaste son iguales');
                    inGame = false;
                    pieceInGame = null;
                }
                else{
                    inGame = false;
                    setTimeout(() => {
                        hiddenPiece(pieceInGame,piece)
                        pieceInGame = null;
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