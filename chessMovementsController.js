function getPiece(pos) {
    return chessPiecesCurrentPosition(pos);
}


function isValidMoveForPieceToCordinate(currentPos, newPos, piece) {
    switch(piece.type) {

        case 'p':
            return isValidPonMove(currentPos, newPos, piece);
        case 'n':
            return isValidKnightMove(currentPos, newPos, piece);
    }

    return true;
}

function isValidMove(currentPos, targetPos) {
    let piece = chessPiecesCurrentPosition[currentPos];
    let targetPosPiece = chessPiecesCurrentPosition[targetPos];
    const piece1 = getPieceDetails(piece); 
    const piece2 = getPieceDetails(targetPosPiece);

    //Rule 1: If both pieces are same color return false
    if(piece1.color === piece2.color) return false;
    //Rule2 : Validate if the movement to a cordinate is allowed
    if(!isValidMoveForPieceToCordinate(currentPos, targetPos, piece1)) return false;

    return true;
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
    chessPiecesCurrentPosition[newPos] = {...chessPiecesCurrentPosition[currentPos]};
    delete  chessPiecesCurrentPosition[currentPos];
    return true;
}
