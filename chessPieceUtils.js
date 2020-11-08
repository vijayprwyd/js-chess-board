function getPieceDetails(piece) {
    return {
        color: piece && piece.pieceType && piece.pieceType[0],
        type: piece && piece.pieceType && piece.pieceType[1],
    };
}

function getDirectionForPieceBasedOnColor(color) {
    return facingPiece === color ? -1 : 1;
}

function isValidPonMove(currentPos, newPos, piece) {
    const direction = getDirectionForPieceBasedOnColor(piece.color);
    // 2 steps allowed in first move
    if (
        currentPos + 16 * direction === newPos &&
        (Math.floor(currentPos / 8) === 6 || Math.floor(currentPos / 8) === 1) &&
        !chessPiecesCurrentPosition[newPos]
    )
        return true;
    // only 1 step allowed in subsequent move
    if (
        currentPos + 8 * direction === newPos &&
        !chessPiecesCurrentPosition[newPos]
    )
        return true;
    // diagonal cut of piece allowed
    // if(currentPos + 7 * direction === newPos && )
    let newPiece = getPieceDetails(chessPiecesCurrentPosition[newPos]);
    if (
        newPiece &&
        newPiece.color !== piece.color &&
        (currentPos + 9 * direction === newPos ||
            currentPos + 7 * direction === newPos)
    )
        return true;

    return false;
}