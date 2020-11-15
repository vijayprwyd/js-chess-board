let chessPiecesCurrentPosition = {};
let facingPiece = 'w'; // Indicates the facing piece to user, changes on flipping the board
let currentPlayerColor = 'w';

let blackKingPos = 4;
let whiteKingPos = 60;

function getFacingPiece() {
    return facingPiece;
}

function setFacingPiece(piece) {
    return facingPiece = piece;
}

function getCurrentPlayerColor() {
    return currentPlayerColor;
}

function toggleCurrentPlayerColor() {
    currentPlayerColor = currentPlayerColor === 'w' ? 'b' : 'w';
}

function getCurrentPlayerKingPos() {
    return currentPlayerColor === 'w' ? whiteKingPos : blackKingPos
}

function getOpponentPlayerKingPos() {
    return currentPlayerColor === 'w' ? blackKingPos : whiteKingPos
}
function setKingPos(pos) {
    if(currentPlayerColor === 'w') {
        whiteKingPos = pos;
    } else {
        blackKingPos = pos;
    }
}