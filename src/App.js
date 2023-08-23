import React, { useState } from 'react';
import './css/App.css'

const GRID_WIDTH = 8;
const GRID_HEIGHT = 8;
const P1_COLOR = 'red';
const P2_COLOR = 'blue';
const WIN_LIMIT = 3;

function App() {

  const [activePlayer, setActivePlayer] = useState(1);

  // Step-1, generate table
  // Step-2: Generate board
  // Step-3: Click handling
  // Step-4: Check if there is winner

  // #1
  const [table, setTable] = useState(new Array(GRID_HEIGHT).fill().map(() => new Array(GRID_WIDTH).fill(0)));

  //console.table(table);

  // #4
  const checkWin = (coordinateX, coordinateY, player) => {
    let countHorizontal = 0;
    let countVertical = 0;

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

    console.log('----------------', 'Horizontal:', countHorizontal, 'Vertical:', countVertical);
  };


  // #3
  const handleClick = (e) => {
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
      setActivePlayer(oldPlayer => oldPlayer === 1 ? 2 : 1);

      // Clone new table
      let newTable = [...table];
      newTable[y][x] = activePlayer === 1 ? 1 : 2;
      //console.table(newTable);
      // Set table
      setTable(oldTable => oldTable = [...newTable]);

      //console.table(newTable);

      checkWin(x, y, activePlayer);
    }
  };

  return (
    <div className="App">
      <div className='container'>
        {/* #2 */}
        <div className='board'>
          {table.map((row, rowIndex) => (
            <div className='row' key={rowIndex}>
              {row.map((col, colIndex) => (
                <div className='cell' key={colIndex} data-child-id={`${colIndex}${rowIndex}`} onClick={handleClick}>
                  <div className='disk' id={`${colIndex}${rowIndex}`}>{colIndex}{rowIndex}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
