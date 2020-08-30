let count = 0, resizeCount = 0;
function createChessBoard() {

    let chessboard = document.createElement('div');
    chessboard.setAttribute('class', 'chessboard');

    function resizeChessBoard(entries) {

        for (const entry of entries) {

            let squareSize = Math.min(entry.contentRect.width, entry.contentRect.height);
            let normalizedSize = Math.floor(squareSize/TOTAL_SQUARES) * TOTAL_SQUARES;
            chessboard.style.width = `${normalizedSize}px`
            chessboard.style.height = `${normalizedSize}px`
        }
    }

    let debouncedResizeObserver = debounce(resizeChessBoard);
    const resizeObserver = new ResizeObserver(function (entries) {
        debouncedResizeObserver(entries);
    });

    resizeObserver.observe(document.body);

    // To track the piece that is currently moved
    let activePiece;
    let offset;
    let x, y;

    document.getElementById('root').appendChild(chessboard);

    createSquare();
    createSquare(2, 3);

    function getPos(X, Y) {

        x = X, y = Y;

        if(x < 0) x = 0;
        else if(x > chessboard.offsetWidth - activePiece.offsetWidth)  x  = chessboard.offsetWidth - activePiece.offsetWidth;
    
        if(y < 0) y = 0;
        else if(y > chessboard.offsetHeight - activePiece.offsetHeight) y  = chessboard.offsetHeight - activePiece.offsetHeight;

        return [x/chessboard.offsetWidth, y/chessboard.offsetWidth];
    }
    
    function trackPieceMove(event) {

        if(activePiece) {

            let [x, y] = getPos(event.clientX + offset[0], event.clientY + offset[1]);
            activePiece.style.left = x*100 +  '%';
            activePiece.style.top = y*100 +  '%';
        }
    }
    
    async function stopTrackPieceMove() {
        document.removeEventListener('mousemove', trackPieceMove);

        if(activePiece) {

            // Absolute x, y cordinates
            let normalizedX = normalizeCordinates(x, chessboard.offsetWidth);
            let normalizedY = normalizeCordinates(y, chessboard.offsetWidth);

            let cX = absoluteToCartesianConverter(normalizedX, chessboard.offsetWidth);
            let cY = absoluteToCartesianConverter(normalizedY, chessboard.offsetWidth);

            activePiece.style.left = absoluteToPercentageConverter(normalizedX, chessboard.offsetWidth);
            activePiece.style.top = absoluteToPercentageConverter(normalizedY, chessboard.offsetWidth);

            let currentPos = activePiece.initialPos;
            try {

                activePiece.initialPos = [cX, cY];
                activePiece.style.left = (normalizedX * 100 / chessboard.offsetWidth) + '%';
                activePiece.style.top = (normalizedY * 100 / chessboard.offsetWidth) + '%';
                let isValid = await updatePosition(currentPos[0] + currentPos[1] * 8, cX + cY * 8);

                if(!isValid) {

                    activePiece.initialPos = currentPos;
                    activePiece.style.cssText = ` left: ${cartesianToPercentageConverter(currentPos[0])}; top: ${cartesianToPercentageConverter(currentPos[1])}`;
     
                }

            } catch(e) {

               activePiece.initialPos = currentPos;
               activePiece.style.cssText = ` left: ${cartesianToPercentageConverter(currentPos[0])}; top: ${cartesianToPercentageConverter(currentPos[1])}`;

            }
        }
        activePiece = null;
    }

    function createSquare(initX = 0, initY = 0, className = 'wp', pieceType = { color: 'white', piece: 'PON'}) {

        chessPiecesCurrentPosition[initX + initY * 8] = pieceType;

        let square = document.createElement('div');
        square.setAttribute('class', className);
        square.style.cssText = ` left: ${cartesianToPercentageConverter(initX)}; top: ${cartesianToPercentageConverter(initY)}`;

        chessboard.appendChild(square);
        square.initialPos = [initX, initY];
        square.pieceType = pieceType;
        square.addEventListener('mousedown', function (e) {
            offset = [
                square.offsetLeft - e.clientX,
                square.offsetTop - e.clientY
            ];
    
            activePiece = square;
            document.addEventListener('mousemove', trackPieceMove);
            document.addEventListener('mouseup',stopTrackPieceMove, true);

        }, true);
    }

    return chessboard;
}

createChessBoard();