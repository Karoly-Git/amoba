export function initializeMatrix(n = 10, m = 10) {
    return Array.from({ length: m }, (_, yIndex) =>
        Array.from({ length: n }, (_, xIndex) => (
            {
                x: xIndex,
                y: yIndex,
                player: '',
                winCell: false
            }
        ))
    );
}
