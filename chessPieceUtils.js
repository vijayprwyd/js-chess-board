function getPieceDetails(piece) {
  return {
    color: piece && piece.pieceType && piece.pieceType[0],
    type: piece && piece.pieceType && piece.pieceType[1],
  };
}

function getDirectionForPieceBasedOnColor(color) {
  return getFacingPiece() === color ? -1 : 1;
}

function getUpdatedStateCopyBeforeValidation(currentPos, targetPos) {
    
  let entries = Object.entries(chessPiecesCurrentPosition), chessPiecesAfterMove = {};
  for(let [key, value] of entries ) {
      chessPiecesAfterMove[key] = value.pieceType; 
  }

  delete chessPiecesAfterMove[targetPos];
  chessPiecesAfterMove[targetPos] = chessPiecesAfterMove[currentPos];
  delete chessPiecesAfterMove[currentPos];
  return chessPiecesAfterMove;
}
