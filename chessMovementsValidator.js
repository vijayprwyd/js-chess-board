function isValidPonMove(currentPos, newPos, piece) {
    const direction = getDirectionForPieceBasedOnColor(piece.color);
    // 2 steps allowed in first move
    if (
        currentPos + 16 * direction === newPos &&
        (Math.floor(currentPos / 8) === 6 || Math.floor(currentPos / 8) === 1) &&
        !chessPiecesCurrentPosition[newPos]
    ) {
        return true;
    }
    // only 1 step allowed in subsequent move
    if (
        currentPos + 8 * direction === newPos &&
        !chessPiecesCurrentPosition[newPos]
    ) {
        return true;
    }
    let newPiece = getPieceDetails(chessPiecesCurrentPosition[newPos]);
    if (
        newPiece.type &&
        newPiece.color !== piece.color &&
        (currentPos + 9 * direction === newPos ||
            currentPos + 7 * direction === newPos)
    ) {
        return true;
    }
    return false;
}

function isValidKnightMove(currentPos, newPos) {
    let diff = Math.abs(currentPos - newPos);
    return diff === 15 || diff === 17 || diff === 6 || diff === 10;
}

function isValidBishopMove(currentPos, newPos) {
    return isValidDiagnoalMove(currentPos, newPos) && !hasPiecesObstructingDiagonalPath(currentPos, newPos);
}

function isValidRookMove(currentPos, newPos) {
    return isValidStraightMove(currentPos, newPos) && !hasPieceObstrucingStraightPath(currentPos, newPos);
}

function isValidQueenMove(currentPos, newPos) {

    return (
        isValidStraightMove(currentPos, newPos) && !hasPieceObstrucingStraightPath(currentPos, newPos) ||
        isValidDiagnoalMove(currentPos, newPos) && !hasPiecesObstructingDiagonalPath(currentPos, newPos)
    );
}

function isValidKingMove(currentPos, newPos) {
    
    let [x1, y1] = convert1DTo2D(currentPos);
    let [x2, y2] = convert1DTo2D(newPos);

    return (Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1);
}

function isValidStraightMove(currentPos, newPos) {
    let [x1, y1] = convert1DTo2D(currentPos);
    let [x2, y2] = convert1DTo2D(newPos);
    return x1 === x2 || y1 === y2;
}

function isValidDiagnoalMove(currentPos, newPos) {
    let [x1, y1] = convert1DTo2D(currentPos);
    let [x2, y2] = convert1DTo2D(newPos);

    return (Math.abs(x1 - x2) === Math.abs(y1 - y2));
}

function hasPiecesObstructingDiagonalPath(currentPos, newPos) {

    let [x1, y1] = convert1DTo2D(currentPos);
    let [x2, y2] = convert1DTo2D(newPos);

    let xStep = x2 < x1 ? 1 : -1;
    let yStep = y2 < y1 ? 1 : -1;

    for (let i = x2 + xStep, j = y2 + yStep; i !== x1 && j != y1; i += xStep, j += yStep) {

        let pos = convert2DTo1D(i, j);
        if (chessPiecesCurrentPosition[pos]) {
            return true;
        }
    }
    return false;
}

function hasPieceObstrucingStraightPath(currentPos, newPos) {
    let [x1, y1] = convert1DTo2D(currentPos);
    let [x2, y2] = convert1DTo2D(newPos);
    if (x1 === x2) {

        let yStep = y1 > y2 ? 1 : -1;

        for(let i = y2 + yStep; i !== y1; i+=yStep) {
            let pos = convert2DTo1D(x1, i);
            if (chessPiecesCurrentPosition[pos] && pos !== currentPos) {
                return true;
            }
        }
    } else {

        let xStep = x1 > x2 ? 1 : -1;
        for(let i = x2 + xStep; i !== x1; i+=xStep) {
            let pos = convert2DTo1D(i, y1);
            if (chessPiecesCurrentPosition[pos] && pos !== currentPos) {
                return true;
            }
        }
    }
    return false;
}

function getCastlingMoveType(currentPos, targetPos) {

    const piece = getPieceDetails(chessPiecesCurrentPosition[currentPos]);
    if(piece.type === 'k') {
        if(targetPos - currentPos === 2 && getIsEligibleForCastling(currentPos, 'KING_SIDE_CASTLING')) return 'KING_SIDE_CASTLING';
        if(currentPos - targetPos === 2 && getIsEligibleForCastling(currentPos, 'QUEEN_SIDE_CASTLING')) return 'QUEEN_SIDE_CASTLING';
    }
}

function isValidMove(currentPos, targetPos) {

    let piece = chessPiecesCurrentPosition[currentPos];
    let targetPosPiece = chessPiecesCurrentPosition[targetPos];
    const piece1 = getPieceDetails(piece);
    const piece2 = getPieceDetails(targetPosPiece);

    //Rule 1: A player cannot have 2 consecutive turns
    if(piece1.color !== getCurrentPlayerColor()) return false;

    //Rule 1: If both pieces are same color return false
    if (piece1.color === piece2.color) return false;
    //Rule2 : Validate if the movement to a cordinate is allowed
    switch (piece1.type) {
        case 'p':
            return isValidPonMove(currentPos, targetPos, piece1);
        case 'n':
            return isValidKnightMove(currentPos, targetPos, piece1);
        case 'b':
            return isValidBishopMove(currentPos, targetPos);
        case 'r':
            return isValidRookMove(currentPos, targetPos);
        case 'q':
            return isValidQueenMove(currentPos, targetPos);
        case 'k':
            return isValidKingMove(currentPos, targetPos)
    }

}