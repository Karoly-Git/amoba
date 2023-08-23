import React, { useState } from 'react';
import './css/App.css'

const GRID_WIDTH = 12;
const GRID_HEIGHT = 12;
const P1_COLOR = 'white';
const P2_COLOR = 'black';
const WIN_LIMIT = 5;

function App() {

  const [activePlayer, setActivePlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);
  const [scores, setScores] = useState({ playerOne: 0, playerTwo: 0 });

  // #1, generate table
  // #2: Generate board
  // #3: Click handling
  // #4: Check if there is winner


  // #1
  const [table, setTable] = useState(new Array(GRID_HEIGHT).fill().map(() => new Array(GRID_WIDTH).fill(0)));

  //console.table(table);

  // #4
  const checkWin = (coordinateX, coordinateY, player) => {
    let countHorizontal = 0;
    let countVertical = 0;
    let countDiagonal1 = 1; // Top-Left to Right-Bottom
    let countDiagonal2 = 1; // Top-Right to Bottom-Left

    let x = coordinateX;
    let y = coordinateY;

    // Horizontal check
    while (table[y][x] === player) {
      x++;
      countHorizontal++;
    }

    x = coordinateX - 1;
    while (table[y][x] === player) {
      x--;
      countHorizontal++;
    }

    // Vertical check
    y = coordinateY;
    while (table[y] && table[y][coordinateX] === player) {
      y++;
      countVertical++;
    }

    y = coordinateY - 1;
    while (table[y] && table[y][coordinateX] === player) {
      y--;
      countVertical++;
    }

    // Diagonal check (top-left to bottom-right)
    x = coordinateX + 1;
    y = coordinateY + 1;
    while (x < GRID_WIDTH && y < GRID_HEIGHT && table[y][x] === player) {
      x++;
      y++;
      countDiagonal1++;
    }

    x = coordinateX - 1;
    y = coordinateY - 1;
    while (x >= 0 && y >= 0 && table[y][x] === player) {
      x--;
      y--;
      countDiagonal1++;
    }

    // Diagonal check (top-right to bottom-left)
    x = coordinateX - 1;
    y = coordinateY + 1;
    while (x >= 0 && y < GRID_HEIGHT && table[y][x] === player) {
      x--;
      y++;
      countDiagonal2++;
    }

    x = coordinateX + 1;
    y = coordinateY - 1;
    while (x < GRID_WIDTH && y >= 0 && table[y][x] === player) {
      x++;
      y--;
      countDiagonal2++;
    }

    if (countHorizontal >= WIN_LIMIT || countVertical >= WIN_LIMIT || countDiagonal1 >= WIN_LIMIT || countDiagonal2 >= WIN_LIMIT) {
      console.log(`Player-${activePlayer} won!`);
      setScores(prevScores => ({
        ...prevScores,
        playerOne: activePlayer === 1 ? prevScores.playerOne + 1 : prevScores.playerOne,
        playerTwo: activePlayer === 2 ? prevScores.playerTwo + 1 : prevScores.playerTwo,
      }));
      setGameFinished(oldValue => oldValue = true);
    };

    // console.log(`Player-${activePlayer}:`, 'Horizontal:', countHorizontal, 'Vertical:', countVertical, 'Diagonal-1:', countDiagonal1, 'Diagonal-2:', countDiagonal2);
  };

  const startNewGame = () => {
    const allDisks = document.querySelectorAll('.disk');
    allDisks.forEach((disk) => {
      disk.style.display = 'none';
    });
    let newTable = new Array(GRID_HEIGHT).fill().map(() => new Array(GRID_WIDTH).fill(0));
    setTable([...newTable]);
    setActivePlayer(oldPlayer => oldPlayer = 1);
    setGameFinished(prevValue => prevValue = false);
  };

  // #3
  const handleClick = (e) => {
    if (!gameFinished) {
      let childId = e.target.getAttribute('data-child-id');
      let child = document.getElementById(`${childId}`);

      // Get position in the table
      let x = Number(childId[0]);
      let y = Number(childId[1]);
      //console.log(x, y);
      if (table[y][x] !== 0) {
        console.log('Sorry, cannot chose this!')
      } else {
        child.style.display = 'flex';
        child.style.backgroundColor = activePlayer === 1 ? P1_COLOR : P2_COLOR;
        setActivePlayer(prevPlayer => prevPlayer === 1 ? 2 : 1);

        // Clone new table
        let newTable = [...table];
        newTable[y][x] = activePlayer === 1 ? 1 : 2;
        //console.table(newTable);
        // Set table
        setTable([...newTable]);

        //console.table(newTable);

        checkWin(x, y, activePlayer);
      }
    } else {
      console.log('Game has finished!');
    }
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='player-house'>
          <h2>
            Player-1
          </h2>
          <h2>
            {scores.playerOne}
          </h2>
        </div>
        <div className='board'>
          {table.map((row, rowIndex) => (
            <div className='row' key={rowIndex}>
              {row.map((col, colIndex) => (
                <div className='cell' key={colIndex} data-child-id={`${colIndex}${rowIndex}`} onClick={handleClick}>
                  <div className='disk' id={`${colIndex}${rowIndex}`}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='player-house'>
          <h2>
            Player-2
          </h2>
          <h2>
            {scores.playerTwo}
          </h2>
        </div>
      </div>
      {gameFinished && <button className='reset-button' onClick={startNewGame}>New Game</button>}
    </div>
  );
}

export default App;
