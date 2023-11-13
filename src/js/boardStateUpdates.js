export function updateCellState(x, y, matrix, setMatrix, activePlayer, setActivePlayer) {
    let newMatrix = [...matrix];

    if (newMatrix[y][x].player === '') {
        newMatrix[y][x].player = activePlayer;
        setActivePlayer(newMatrix[y][x].player === 'A' ? 'B' : 'A');
    }

    setMatrix(newMatrix);
}

export function checkIsAvaliableCell(matrix, setIsAvailableCell) {
    let isAvailableCell = false;

    for (let row of matrix) {
        for (let cell of row) {
            if (cell.player === '') {
                isAvailableCell = true;
                break;
            }
        }
    }

    if (!isAvailableCell) {
        setIsAvailableCell(false);
    }
}

export function startNewGame(
    isWinner, setIsWinner, setIsAvailableCell, setMatrix,
    initializeMatrix, activePlayer, setActivePlayer
) {
    setIsWinner(false);
    setIsAvailableCell(true);
    setMatrix(initializeMatrix());
    isWinner ? setActivePlayer(activePlayer === 'A' ? 'B' : 'A') : setActivePlayer('A'); // The winner starts next game.
}


