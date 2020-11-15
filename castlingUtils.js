let isWhiteEligibleForKingSideCastling = true;
let isWhiteEligibleForQueenSideCastling = true;
let isBlackEligibleForKingSideCastling = true;
let isBlackEligibleForQueenSideCastling = true;

function updateCastlingEligiblity(currentPos, targetPos) {

    if(currentPos === targetPos) return;

    const piece = getPieceDetails(chessPiecesCurrentPosition[currentPos]);
    // If king moved , no longer eligible for castling
    if(piece.type === 'k') {

        if(getCurrentPlayerColor() === 'w') {
            isWhiteEligibleForKingSideCastling = isWhiteEligibleForQueenSideCastling = false;
        } else {
            isBlackEligibleForKingSideCastling = isBlackEligibleForQueenSideCastling = false;
        }
    }
}

function getIsEligibleForCastling(currentPos, castlingType) {

    if(castlingType === 'KING_SIDE_CASTLING') {

        if(chessPiecesCurrentPosition[currentPos + 1] || chessPiecesCurrentPosition[currentPos + 2]) return false;
        const piece = getPieceDetails(chessPiecesCurrentPosition[currentPos + 3])
        if(piece.type !== 'r') return false;

        return getCurrentPlayerColor() === 'w' ? isWhiteEligibleForKingSideCastling : isBlackEligibleForKingSideCastling; 
    } else {
        if(chessPiecesCurrentPosition[currentPos - 1] || chessPiecesCurrentPosition[currentPos - 2] || chessPiecesCurrentPosition[currentPos - 3]) return false;
        const piece = getPieceDetails(chessPiecesCurrentPosition[getFacingPiece() === getCurrentPlayerColor() ? 56 : 0]);
        if(piece.type !== 'r') return false;
        return getCurrentPlayerColor() === 'b' ? isWhiteEligibleForQueenSideCastling : isBlackEligibleForQueenSideCastling; 
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