function getPiece(pos) {
    return chessPiecesCurrentPosition(pos);
}

async function updatePosition(currentPos, newPos) {
    if(!isValidMove(currentPos, newPos)) {
        return false
    };
    //TODO: Make service call to update the position
    if(chessPiecesCurrentPosition[newPos]) {
        chessPiecesCurrentPosition[newPos].node.remove();
        delete chessPiecesCurrentPosition[newPos];
    }

    const piece = getPieceDetails(chessPiecesCurrentPosition[currentPos]);
    if(piece.type === 'k') {
        setKingPos(newPos);
    }
    chessPiecesCurrentPosition[newPos] = chessPiecesCurrentPosition[currentPos];
    delete  chessPiecesCurrentPosition[currentPos];
    toggleCurrentPlayerColor();
    return true;
}
