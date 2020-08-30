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
    
    function stopTrackPieceMove() {
        document.removeEventListener('mousemove', trackPieceMove);

        // Reset position if invalid move
        let squareWidth = chessboard.offsetWidth/8;
        let halfSquareWidth = squareWidth/2;

        if(activePiece) {

            let newLeft = (Math.ceil((x -halfSquareWidth)/squareWidth)*squareWidth);
            let newTop = (Math.ceil((y -halfSquareWidth)/squareWidth)*squareWidth);

            let newX = newLeft * 100 / (chessboard.offsetWidth * PERCENTAGE_SQUARE_WIDTH)
            let newY = newTop * 100 / (chessboard.offsetWidth * PERCENTAGE_SQUARE_WIDTH)

            console.log(`${newX} ${newY}`)
            activePiece.style.left = (newLeft * 100 / chessboard.offsetWidth) + '%';
            activePiece.style.top = (newTop * 100 / chessboard.offsetWidth) + '%';

        }
        activePiece = null;
    }

    function createSquare(initX = 0, initY = 0) {

        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.style.cssText = ` left: ${initX * PERCENTAGE_SQUARE_WIDTH}%; top: ${initY * PERCENTAGE_SQUARE_WIDTH}%`;
        chessboard.appendChild(square);
    
        square.addEventListener('mousedown', function (e) {
    
            offset = [
                square.offsetLeft - e.clientX,
                square.offsetTop - e.clientY
            ];
    
            activePiece = square;
            activePiece.initialPos = [square.offsetLeft, square.offsetTop];
    
            document.addEventListener('mousemove', trackPieceMove);
            document.addEventListener('mouseup',stopTrackPieceMove, true);

        }, true);
    }

    return chessboard;
}

createChessBoard();