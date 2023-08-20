import React, { useState } from 'react';
import './css/App.css'

const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const P1_COLOR = 'yellow';
const P2_COLOR = 'red';
const WIN_LIMIT = 3;

function App() {
  let rows = new Array(GRID_HEIGHT).fill(null);
  let cols = new Array(GRID_WIDTH).fill(null);

  const [player, setPlayer] = useState(1);
  const [scores, setScores] = useState({ playerOne: 0, playerTwo: 0 });

  const [grid, setGrid] = useState(Array.from({ length: GRID_HEIGHT }, () => new Array(GRID_WIDTH).fill(null)));


  function winnerCheckHorizontal(coordinateX, coordinateY, playerNumber, gridWidth = GRID_WIDTH, winLimit = WIN_LIMIT) {
    let count = 0;
    let y = coordinateY;
    // Right check
    for (let x = coordinateX; x < gridWidth; x++) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
    }
    if (count >= winLimit) {
      console.log(`Player-${playerNumber} won!`);
      let newScores = { ...scores };
      if (playerNumber === 1) {
        newScores.playerOne++;
      }
      if (playerNumber === 2) {
        newScores.playerTwo++;
      }
      setScores(oldScores => oldScores = { ...newScores });
      //console.log(newScores);
      return;
    }

    // Left check
    for (let x = coordinateX - 1; x >= 0; x--) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
    }
    if (count >= winLimit) {
      console.log(`Player-${playerNumber} won!`);
      let newScores = { ...scores };
      if (playerNumber === 1) {
        newScores.playerOne++;
      }
      if (playerNumber === 2) {
        newScores.playerTwo++;
      }
      setScores(oldScores => oldScores = { ...newScores });
      //console.log(newScores);
      return;
    }
  }

  function winnerCheckVertical(coordinateX, coordinateY, playerNumber, gridWidth = GRID_WIDTH, winLimit = WIN_LIMIT) {
    let count = 0;
    let x = coordinateX;
    // Up check
    for (let y = coordinateY; y >= 0; y--) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
    }
    if (count >= winLimit) {
      console.log(`Player-${playerNumber} won!`);
      return;
    }

    // Down check
    for (let y = coordinateY + 1; y < GRID_HEIGHT; y++) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
    }
    if (count >= winLimit) {
      console.log(`Player-${playerNumber} won!`);
      return;
    }
  }

  function winnerCheckDiagonal(coordinateX, coordinateY, playerNumber, gridWidth = GRID_WIDTH, winLimit = WIN_LIMIT) {
    let count = 0;
    let x = coordinateX;
    let y = coordinateY;
    // Up-Right
    while (x < GRID_WIDTH && y >= 0) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
      if (count >= winLimit) {
        console.log(`Player-${playerNumber} won!`);
        return;
      }
      x++;
      y--;
    }
    // Down-Left
    x = coordinateX - 1;
    y = coordinateY + 1;
    while (x >= 0 && y < GRID_HEIGHT) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
      if (count >= winLimit) {
        console.log(`Player-${playerNumber} won!`);
        return;
      }
      x--;
      y++;
    }
    // Up-Left
    x = coordinateX - 1;
    y = coordinateY - 1;
    while (x >= 0 && y >= 0) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
      if (count >= winLimit) {
        console.log(`Player-${playerNumber} won!`);
        return;
      }
      x--;
      y--;
    }
    // Down-Right
    x = coordinateX + 1;
    y = coordinateY + 1;
    while (x < GRID_WIDTH && y < GRID_HEIGHT) {
      if (grid[y][x] === playerNumber) {
        count++;
      } else {
        break;
      }
      if (count >= winLimit) {
        console.log(`Player-${playerNumber} won!`);
        return;
      }
      x++;
      y++;
    }

  }

  const handleClick = (e) => {
    const x = parseInt(e.target.getAttribute('data-x'));
    const y = parseInt(e.target.getAttribute('data-y'));

    if (grid[y][x] === null) {
      const newGrid = [...grid];
      newGrid[y][x] = player;
      setGrid(newGrid);
    }

    //console.table(grid);

    winnerCheckHorizontal(x, y, 1);
    winnerCheckHorizontal(x, y, 2);

    winnerCheckVertical(x, y, 1);
    winnerCheckVertical(x, y, 2);

    winnerCheckDiagonal(x, y, 1);
    winnerCheckDiagonal(x, y, 2);


    let isUsed = e.target.getAttribute('data-used-by');

    if (!isUsed) e.target.setAttribute('data-used-by', player === 1 ? 2 : 1);

    if (player === 1 && !isUsed) {
      e.target.style.backgroundColor = P1_COLOR;
      //console.log(P1_COLOR, `x: ${x}`, `y: ${y}`);
    } else if (player === 2 && !isUsed) {
      e.target.style.backgroundColor = P2_COLOR;
      //console.log(P2_COLOR, `x: ${x}`, `y: ${y}`);
    } else {
      console.log('Sorry, cell is aleady occupied!')
    }

    if (!isUsed) {
      setPlayer(oldPlayer => oldPlayer === 1 ? 2 : 1)
    }
  }

  return (
    <div className="App">
      <h1>{player === 1 ? "Karoly's turn" : "Joanna's turn"}</h1>
      <div className='container'>
        <div className='player-house'>
          <h2>Karoly</h2>
          <h3>Score: {scores.playerOne}</h3>
        </div>
        <div className='table'>
          {rows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {cols.map((col, colIndex) => (
                <div
                  className='cell'
                  data-x={colIndex}
                  data-y={rowIndex}
                  data-used-by={undefined}
                  onClick={handleClick}
                  key={colIndex}>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='player-house'>
          <h2>Joanna</h2>
          <h3>Score: {scores.playerTwo}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
