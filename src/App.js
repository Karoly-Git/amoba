import React, { useState } from 'react';
import './css/App.css'

const GRID_WIDTH = 5;
const GRID_HEIGHT = 8;
const P1_COLOR = 'red';
const P2_COLOR = 'blue';
const WIN_LIMIT = 3;

function App() {

  const [activePlayer, setActivePlayer] = useState(1);

  // Step-1, generate table

  let table = new Array(GRID_HEIGHT).fill().map(() => new Array(GRID_WIDTH).fill(null));

  //console.table(table);
  //console.log(table);

  // Step-2: Generate board

  // Step-3: Click handling
  const handleClick = (e) => {
    let childId = e.target.getAttribute('data-child-id');
    let child = document.getElementById(`${childId}`)
    console.log(childId);
    child.style.display = 'flex';
    child.style.backgroundColor = activePlayer === 1 ? P1_COLOR : P2_COLOR;
    setActivePlayer(oldPlayer => oldPlayer === 1 ? 2 : 1);
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='board'>
          {table.map((row, rowIndex) => (
            <div className='row' key={rowIndex}>
              {row.map((col, colIndex) => (
                <div className='cell' key={colIndex} data-child-id={`${rowIndex}${colIndex}`} onClick={handleClick}>
                  <div className='disk' id={`${rowIndex}${colIndex}`}>{rowIndex}{colIndex}</div>
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
