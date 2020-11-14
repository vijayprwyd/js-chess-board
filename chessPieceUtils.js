function getPieceDetails(piece) {
  return {
    color: piece && piece.pieceType && piece.pieceType[0],
    type: piece && piece.pieceType && piece.pieceType[1],
  };
}

function getDirectionForPieceBasedOnColor(color) {
  return facingPiece === color ? -1 : 1;
}