function getPiece(pos) {
    return chessPiecesCurrentPosition(pos);
}


function updateChessPieceIndices(currentPos, newPos) {
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
    // toggleCurrentPlayerColor();
}

async function updatePosition(currentPos, newPos) {

    if(currentPos === newPos) return 'INVALID_MOVE';

    const castlingMoveType = getCastlingMoveType(currentPos, newPos);
    if(castlingMoveType) {
        updateChessPieceIndices(currentPos, newPos);
        const [rookPos, castledRookPos] = getRookPositionsToUpdateAfterCastling(castlingMoveType);
        updateCastlingEligiblity(currentPos, newPos);
        updateChessPieceIndices(rookPos, castledRookPos);
        return castlingMoveType;
    }

    if(!isValidMove(currentPos, newPos)) {
        return 'INVALID_MOVE'
    };

    if(isKingUnderCheckAfterMove(currentPos, newPos)) {
        return 'UNDER_CHECK';
    }
    //TODO: Make service call to update the position
    updateCastlingEligiblity(currentPos, newPos);
    updateChessPieceIndices(currentPos, newPos);
    return 'VALID';
}
