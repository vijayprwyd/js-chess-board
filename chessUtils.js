const absoluteToCartesianConverter = (pos, size) => pos * 100 / (size * PERCENTAGE_SQUARE_WIDTH);

function normalizeCordinates(pos, size) {

    let squareSize = size/TOTAL_SQUARES;
    let halfSquareSize = squareSize / 2;
    return  (Math.ceil((pos -halfSquareSize)/squareSize)*squareSize);
}

function absoluteToPercentageConverter(pos, size) {
    return  (pos * 100 / size) + '%';
}

function cartesianToPercentageConverter(pos) {
    return `${pos * PERCENTAGE_SQUARE_WIDTH}%`;
}