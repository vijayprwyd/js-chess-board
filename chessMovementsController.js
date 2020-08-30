let chessPiecesCurrentPosition = {};

function isValidMove(oldPos, newPos) {

    return false;
}

async function updatePosition(currentPos, newPos) {

    chessPiecesCurrentPosition[newPos] = chessPiecesCurrentPosition[currentPos];

    if(!isValidMove(currentPos, newPos)) return false;
    //TODO: Make service call to update the position

    delete  chessPiecesCurrentPosition[currentPos];
    return true;
}
