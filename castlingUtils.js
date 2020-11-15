let isWhiteEligibleForKingSideCastling = true;
let isWhiteEligibleForQueenSideCastling = true;
let isBlackEligibleForKingSideCastling = true;
let isBlackEligibleForQueenSideCastling = true;

function updateCastlingEligiblity(currentPos, targetPos) {

    if(currentPos === targetPos) return;

    const piece = getPieceDetails(chessPiecesCurrentPosition[currentPos]);

    if(piece.type === 'r') {

        if(currentPos === 7 || currentPos === 63) {
            console.log('Updated King side ability');
            if(getCurrentPlayerColor() === 'w') isWhiteEligibleForKingSideCastling = false;
            else isBlackEligibleForKingSideCastling = false;
        } else if(currentPos === 0 || currentPos === 56) {
            console.log('Updated queen side ability');

            if(getCurrentPlayerColor() === 'w') isWhiteEligibleForQueenSideCastling = false;
            else isBlackEligibleForQueenSideCastling = false;
        }
    }

    // If king moved , no longer eligible for castling
    if(piece.type === 'k') {

        if(getCurrentPlayerColor() === 'w') {
            isWhiteEligibleForKingSideCastling = isWhiteEligibleForQueenSideCastling = false;
        } else {
            isBlackEligibleForKingSideCastling = isBlackEligibleForQueenSideCastling = false;
        }
    }
}

function isCastlingPositionsAttacked(positionArray, chessStateCopy) {
 
    return positionArray.some(pos => {
        const cordinates = convert1DTo2D(pos);
        return isPieceAttackedByPawn(cordinates, chessStateCopy) || isPieceAttackedStraight(cordinates, chessStateCopy) || isPieceAttackedDiagonally(cordinates, chessStateCopy) || isPieceAttackedByKnight(cordinates, chessStateCopy);
    });
}

function getIsEligibleForCastling(currentPos, castlingType) {

    if(castlingType === 'KING_SIDE_CASTLING') {

        if(getCurrentPlayerColor() === 'w' && !isWhiteEligibleForKingSideCastling) return false;
        if(getCurrentPlayerColor() === 'b' && !isBlackEligibleForKingSideCastling) return false;

        if(chessPiecesCurrentPosition[currentPos + 1] || chessPiecesCurrentPosition[currentPos + 2]) return false;

        const piece = getPieceDetails(chessPiecesCurrentPosition[currentPos + 3])
        if(piece.type !== 'r') return false;

        const chessStateCopy = getUpdatedStateCopyBeforeValidation(currentPos, currentPos + 2);
        if(isCastlingPositionsAttacked([currentPos, currentPos + 1, currentPos + 2], chessStateCopy)) return false;

        return true; 
    } else {

        if(getCurrentPlayerColor() === 'w' && !isWhiteEligibleForQueenSideCastling) return false;
        if(getCurrentPlayerColor() === 'b' && !isBlackEligibleForQueenSideCastling) return false;


        if(chessPiecesCurrentPosition[currentPos - 1] || chessPiecesCurrentPosition[currentPos - 2] || chessPiecesCurrentPosition[currentPos - 3]) return false;

        const piece = getPieceDetails(chessPiecesCurrentPosition[getFacingPiece() === getCurrentPlayerColor() ? 56 : 0]);
        if(piece.type !== 'r') return false;

        const chessStateCopy = getUpdatedStateCopyBeforeValidation(currentPos, currentPos + 2);
        if(isCastlingPositionsAttacked([currentPos, currentPos - 1, currentPos - 2], chessStateCopy)) return false;

        return true; 
    }
}

function getRookPositionsToUpdateAfterCastling(direction) {
    switch(direction) {
      case 'KING_SIDE_CASTLING':
        return getCurrentPlayerColor() === facingPiece ? [63, 61] : [7, 5];
      case 'QUEEN_SIDE_CASTLING':
        return getCurrentPlayerColor() === facingPiece ? [56, 59] : [0, 3];
    }
  }