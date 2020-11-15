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

function convert1DTo2D(cordinate) {
    return [cordinate % 8, Math.floor(cordinate / 8)];
}

function convert2DTo1D(x, y) {

    return x  + y * 8;

}

function isValidSquare(x, y) {

    return x >=0 && x <8 && y>=0 && y < 8;
}