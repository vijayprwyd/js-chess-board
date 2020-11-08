function getDirectionForPieceBasedOnColor(color) {

    return facingPiece === color ? -1 : 1;
}

function isValidPonMove(currentPos, newPos, piece) {
    const direction = getDirectionForPieceBasedOnColor(piece.color)
    if(currentPos + 8 * direction  === newPos && !chessPiecesCurrentPosition[newPos]) return true;

}