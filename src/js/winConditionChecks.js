export function checkHorizontal(x, y, matrix, activePlayer, winCount, scoreA, scoreB, setScoreA, setScoreB, setIsWinner, setMatrix) {
    let startX = x;

    while (startX >= 0 && matrix[y][startX].player === activePlayer) {
        startX--;
    }

    let count = 0;

    for (let k = startX + 1; k < matrix[0].length && matrix[y][k].player === activePlayer; k++) {
        count++;

        if (count >= winCount) {
            activePlayer === 'A' ? setScoreA(scoreA + 1) : setScoreB(scoreB + 1);
            setIsWinner(true);

            // Highlight Winning Cells ... //
            let newMatrix = [...matrix];
            for (let i = startX + 1; i <= startX + winCount; i++) {
                newMatrix[y][i].winCell = true;
            }
            setMatrix(newMatrix);
            // ... Highlight Winning Cells //

            break;
        }
    }
}

export function checkVertical(x, y, matrix, activePlayer, winCount, scoreA, scoreB, setScoreA, setScoreB, setIsWinner, setMatrix) {
    let startY = y;

    while (startY >= 0 && matrix[startY][x].player === activePlayer) {
        startY--;
    }

    let count = 0;

    for (let k = startY + 1; k < matrix.length && matrix[k][x].player === activePlayer; k++) {
        count++;

        if (count >= winCount) {
            activePlayer === 'A' ? setScoreA(scoreA + 1) : setScoreB(scoreB + 1);
            setIsWinner(true);

            // Highlight Winning Cells ... //
            let newMatrix = [...matrix];
            for (let i = startY + 1; i <= startY + winCount; i++) {
                newMatrix[i][x].winCell = true;
            }
            setMatrix(newMatrix);
            // ... Highlight Winning Cells //

            break;
        }
    }
}

export function checkDiagonalA(x, y, matrix, activePlayer, winCount, scoreA, scoreB, setScoreA, setScoreB, setIsWinner, setMatrix) {
    let startX = x;
    let startY = y;

    while (startX >= 0 && startY >= 0 && matrix[startY][startX].player === activePlayer) {
        startX--;
        startY--;
    }

    let count = 0;

    for (let k = startX + 1, m = startY + 1; k < matrix[0].length && m < matrix.length && matrix[m][k].player === activePlayer; k++, m++) {
        count++;

        if (count >= winCount) {
            activePlayer === 'A' ? setScoreA(scoreA + 1) : setScoreB(scoreB + 1);
            setIsWinner(true);

            // Highlight Winning Cells ... //
            let newMatrix = [...matrix];
            for (let i = 1; i <= winCount; i++) {
                newMatrix[startY + i][startX + i].winCell = true;
            }
            setMatrix(newMatrix);
            // ... Highlight Winning Cells //

            break;
        }
    }
}

export function checkDiagonalB(x, y, matrix, activePlayer, winCount, scoreA, scoreB, setScoreA, setScoreB, setIsWinner, setMatrix) {
    let startX = x;
    let startY = y;

    while (startX < matrix[0].length && startY >= 0 && matrix[startY][startX].player === activePlayer) {
        startX++;
        startY--;
    }

    let count = 0;

    for (let k = startX - 1, m = startY + 1; k >= 0 && m < matrix.length && matrix[m][k].player === activePlayer; k--, m++) {
        count++;

        if (count >= winCount) {
            activePlayer === 'A' ? setScoreA(scoreA + 1) : setScoreB(scoreB + 1);
            setIsWinner(true);

            // Highlight Winning Cells ... //
            let newMatrix = [...matrix];
            for (let i = 1; i <= winCount; i++) {
                newMatrix[startY + i][startX - i].winCell = true;
            }
            setMatrix(newMatrix);
            // ... Highlight Winning Cells //

            break;
        }
    }
}
