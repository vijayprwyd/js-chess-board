function isAttackedByKnight(kingCordinate, chessPiecesAfterMove) {
    const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, -2], [-1, 2]];
    const [kx, ky] = kingCordinate;

    return knightMoves.some(([x, y]) => {

        if(isValidSquare(kx +x, ky +y)) return false;
        const index = convert2DTo1D(kx + x, ky + y);
        const piece = chessPiecesAfterMove[index];

        if(piece) {
            if(piece[1] === 'n' &&  piece[0] !== getCurrentPlayerColor()) {
                return true;
            }
        }        
    });
}

function isKingAttackedDiagonally(kingCordinate, chessPiecesAfterMove) {

    let diagonalMoves = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
    const [kx, ky] = kingCordinate;
    return diagonalMoves.some(([x, y]) => {

        for(let i = x, j = y; isValidSquare(kx + i, ky + j); i+=x, j+=y) {

            const index = convert2DTo1D(kx + i, ky + j);
            const piece = chessPiecesAfterMove[index];
            if(piece) {
                if((piece[1] === 'b' || piece[1] === 'q') &&  piece[0] !== getCurrentPlayerColor()) {
                    return true;
                } else {
                    break;
                }
            } 
        }
    });
}

function isKingAttackedStraight(kingCordinate, chessPiecesAfterMove) {

    let strightMoves = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    const [kx, ky] = kingCordinate;
    return strightMoves.some(([x, y]) => {

        for(let i = x, j = y; isValidSquare(kx + i, ky + j); i+=x, j+=y) {

            const index = convert2DTo1D(kx + i, ky + j);
            const piece = chessPiecesAfterMove[index];
            if(piece) {
                if((piece[1] === 'r' || piece[1] === 'q') &&  piece[0] !== getCurrentPlayerColor()) {
                    return true;
                } else {
                    break;
                }
            }
        }
    });

}


function isKingAttackedByPawn(kingCordinate, chessPiecesAfterMove) {
    const currentPlayerColor = getCurrentPlayerColor();
    const direction = getDirectionForPieceBasedOnColor(currentPlayerColor);

    let pawnMoves = [7, 9];

    return pawnMoves.some((position) => {
        const index = convert2DTo1D(...kingCordinate) + position * direction;
        const piece = chessPiecesAfterMove[index];
        if(piece) {
            if(piece[1] === 'p' &&  piece[0] !== getCurrentPlayerColor()) {
                return true;
            }
        }
    });
}


function isKingUnderCheckAfterMove(currentPos, targetPos) {
    let entries = Object.entries(chessPiecesCurrentPosition), chessPiecesAfterMove = {};
    for(let [key, value] of entries ) {
        chessPiecesAfterMove[key] = value.pieceType; 
    }
    let kingPosition = chessPiecesAfterMove[currentPos] === `${currentPlayerColor}k` ? targetPos :  getCurrentPlayerKingPos();
    delete chessPiecesAfterMove[targetPos];
    chessPiecesAfterMove[targetPos] = chessPiecesAfterMove[currentPos];
    delete chessPiecesAfterMove[currentPos];
    let kingCordinates = convert1DTo2D(kingPosition);
    return  isKingAttackedByPawn(kingCordinates, chessPiecesAfterMove) || isAttackedByKnight(kingCordinates, chessPiecesAfterMove) || isKingAttackedDiagonally(kingCordinates, chessPiecesAfterMove) || isKingAttackedStraight(kingCordinates, chessPiecesAfterMove);
}