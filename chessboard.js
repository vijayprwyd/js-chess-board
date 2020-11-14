function createChessBoard() {
    let chessboard = document.createElement('div');
    chessboard.setAttribute('class', 'chessboard');

    // To track the piece that is currently moved
    let activePiece, offset, x, y, mouseMoved, targetMove;

    targetMove = document.createElement('div');
    targetMove.setAttribute('class', 'cp target-move' );
    targetMove.setAttribute("style", 'top: -100%');

    // function which observes the chessboard resize events and accordingly modifies the size of the pieces
    function resizeChessboardObserver() {
        let debouncedResizeObserver = debounce(resizeChessBoard);
        const resizeObserver = new ResizeObserver(function (entries) {
            debouncedResizeObserver(entries);
        });
        resizeObserver.observe(document.body);
    
        function resizeChessBoard(entries) {
    
            for (let entry of entries) {
    
                let squareSize = Math.min(entry.contentRect.width, entry.contentRect.height);
                let normalizedSize = Math.floor(squareSize/TOTAL_SQUARES) * TOTAL_SQUARES;
                chessboard.style.width = `${normalizedSize}px`
                chessboard.style.height = `${normalizedSize}px`
            }
        }    
    }

    function getPos(X, Y) {

        x = X, y = Y;

        if(x < 0) x = 0;
        else if(x > chessboard.offsetWidth - activePiece.offsetWidth)  x  = chessboard.offsetWidth - activePiece.offsetWidth;
    
        if(y < 0) y = 0;
        else if(y > chessboard.offsetHeight - activePiece.offsetHeight) y  = chessboard.offsetHeight - activePiece.offsetHeight;

        return [x/chessboard.offsetWidth, y/chessboard.offsetWidth];
    }
    
    // Tracks mouse move and positions the pieces within the board according to the position of mouse
    function trackPieceMove(event) {
        event.preventDefault();
        mouseMoved = true;
        if(activePiece) {

            let [x, y] = getPos(event.clientX + offset[0], event.clientY + offset[1], chessboard, activePiece);
            activePiece.style.left = x*100 +  '%';
            activePiece.style.top = y*100 +  '%';
        }
    }
    
    // Invoked after a piece is positioned on a point during a players turn
    async function stopTrackPieceMove(event) {
        event.preventDefault();
        document.removeEventListener('mousemove', trackPieceMove);
        // handle se-cases where mouse is clicked on a piece but not moved
        if(!mouseMoved) {
            activePiece = null;
            return;
        } ;
        mouseMoved = false;
        if(activePiece) {

            // Absolute x, y cordinates
            let normalizedX = normalizeCordinates(x, chessboard.offsetWidth);
            let normalizedY = normalizeCordinates(y, chessboard.offsetWidth);

            let cX = absoluteToCartesianConverter(normalizedX, chessboard.offsetWidth);
            let cY = absoluteToCartesianConverter(normalizedY, chessboard.offsetWidth);

            activePiece.style.left = absoluteToPercentageConverter(normalizedX, chessboard.offsetWidth);
            activePiece.style.top = absoluteToPercentageConverter(normalizedY, chessboard.offsetWidth);

            let currentPos = [...activePiece.initialPos];
            try {
                let isValid = await updatePosition(currentPos[0] + currentPos[1] * 8, cX + cY * 8);

                if(isValid) {
                    activePiece.initialPos = [cX, cY];
                    activePiece.style.left = (normalizedX * 100 / chessboard.offsetWidth) + '%';
                    activePiece.style.top = (normalizedY * 100 / chessboard.offsetWidth) + '%';
                    
                    targetMove.style.left = (normalizedX * 100 / chessboard.offsetWidth) + '%';
                    targetMove.style.top = (normalizedY * 100 / chessboard.offsetWidth) + '%';    

                } else {
                    activePiece.style.cssText = ` left: ${cartesianToPercentageConverter(activePiece.initialPos[0])}; top: ${cartesianToPercentageConverter(activePiece.initialPos[1])}`;
                }
            } catch(e) {
            }
        }
        activePiece = null;
    }

    /**
     * 
     * @param {*} initX  X cordinate of the piece
     * @param {*} initY Y cordinate of the piece
     * @param {*} className 
     * @param {*} pieceType represents the piece ie PON, ROOK, KING etc and also the color WHITE / BLACK
     */
    function createSquare(initX = 0, initY = 0, className) {

        let square = document.createElement('div');
        square.classList.add('cp');
        square.classList.add(className);
        square.pieceType = className;
        square.style.cssText = ` left: ${cartesianToPercentageConverter(initX)}; top: ${cartesianToPercentageConverter(initY)}`;

        chessboard.appendChild(square);
        chessboard.appendChild(targetMove);

        square.initialPos = [initX, initY];
        square.addEventListener('mousedown', function (e) {
            e.preventDefault();
            offset = [
                square.offsetLeft - e.clientX,
                square.offsetTop - e.clientY
            ];

            activePiece = square;
            document.addEventListener('mousemove', trackPieceMove);
            document.addEventListener('mouseup',stopTrackPieceMove, true);
        });
        chessPiecesCurrentPosition[initX + initY * 8] = {
            pieceType: className,
            node: square
        };
    }

    INITIAL_POSITIONS.forEach(position => createSquare(...position));
    resizeChessboardObserver();
    //chessPiecesCurrentPosition[0].node.setAttribute('style', 'background-color: blue')

    document.getElementById('root').appendChild(chessboard);
    return chessboard;
}

createChessBoard();