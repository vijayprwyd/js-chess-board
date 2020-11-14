let chessPiecesCurrentPosition = {};
let facingPiece = 'w'; // Indicates the facing piece to user, changes on flipping the board
let currentPlayerColor = 'w';

function getCurrentPlayerColor() {
    return currentPlayerColor;
}

function toggleCurrentPlayerColor() {

    currentPlayerColor = currentPlayerColor === 'w' ? 'b' : 'w';
}
