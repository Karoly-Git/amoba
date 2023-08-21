function checkWin(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Check horizontally
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= cols - 5; col++) {
            if (
                matrix[row][col] !== '.' &&
                matrix[row][col] === matrix[row][col + 1] &&
                matrix[row][col] === matrix[row][col + 2] &&
                matrix[row][col] === matrix[row][col + 3] &&
                matrix[row][col] === matrix[row][col + 4]
            ) {
                return true;
            }
        }
    }

    // Check vertically
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row <= rows - 5; row++) {
            if (
                matrix[row][col] !== '.' &&
                matrix[row][col] === matrix[row + 1][col] &&
                matrix[row][col] === matrix[row + 2][col] &&
                matrix[row][col] === matrix[row + 3][col] &&
                matrix[row][col] === matrix[row + 4][col]
            ) {
                return true;
            }
        }
    }

    // Check diagonally (top-left to bottom-right)
    for (let row = 0; row <= rows - 5; row++) {
        for (let col = 0; col <= cols - 5; col++) {
            if (
                matrix[row][col] !== '.' &&
                matrix[row][col] === matrix[row + 1][col + 1] &&
                matrix[row][col] === matrix[row + 2][col + 2] &&
                matrix[row][col] === matrix[row + 3][col + 3] &&
                matrix[row][col] === matrix[row + 4][col + 4]
            ) {
                return true;
            }
        }
    }

    // Check diagonally (top-right to bottom-left)
    for (let row = 0; row <= rows - 5; row++) {
        for (let col = 4; col < cols; col++) {
            if (
                matrix[row][col] !== '.' &&
                matrix[row][col] === matrix[row + 1][col - 1] &&
                matrix[row][col] === matrix[row + 2][col - 2] &&
                matrix[row][col] === matrix[row + 3][col - 3] &&
                matrix[row][col] === matrix[row + 4][col - 4]
            ) {
                return true;
            }
        }
    }

    return false;
}

// Example usage
const board = [
    ['X', 'X', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['O', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    // ... (other rows)
];

console.log(checkWin(board)); // Returns true if there's a win, false otherwise
