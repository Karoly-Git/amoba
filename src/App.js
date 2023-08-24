import React, { useState } from 'react';
import './css/App.css'

import { BsGear as GearIcon } from 'react-icons/bs';
import { MdDone as DoneIcon } from 'react-icons/md';

const GRID_WIDTH = 12;
const GRID_HEIGHT = 12;
const P1_COLOR = 'white';
const P2_COLOR = 'black';
const WIN_LIMIT = 3;


function App() {

  const [activePlayer, setActivePlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  const [scores, setScores] = useState({ playerOne: 0, playerTwo: 0 });

  const [winnerIs, setWinnerIs] = useState('');

  const [namePlayerOne, setNamePlayerOne] = useState('PLAYER-1');
  const [namePlayerTwo, setNamePlayerTwo] = useState('PLAYER-2');

  const [isInputOneVisible, setIsInputOneVisible] = useState(false);
  const [isInputTwoVisible, setIsInputTwoVisible] = useState(false);

  const [nameInput, setNameInput] = useState('');

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
      setWinnerIs(prevWinner => prevWinner = activePlayer === 1 ? namePlayerOne : namePlayerTwo);
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
  const handleCellClick = (e) => {
    if (!gameFinished) {
      let childId = e.currentTarget.getAttribute('data-child-id');
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
    }
  };

  const handleGearClick = (e) => {
    let playerNumber = Number(e.currentTarget.getAttribute('data-player-number'));
    if (playerNumber === 1) {
      setIsInputOneVisible((prevValue) => !prevValue);
    }
    if (playerNumber === 2) {
      setIsInputTwoVisible((prevValue) => !prevValue);
    }
    setNameInput('');
  };

  const handleDoneClick = (e) => {
    let playerNumber = Number(e.currentTarget.getAttribute('data-player-number'));
    if (playerNumber === 1) {
      setIsInputOneVisible((prevValue) => false);
      if (nameInput) setNamePlayerOne(nameInput);
    }
    if (playerNumber === 2) {
      setIsInputTwoVisible((prevValue) => false);
      if (nameInput) setNamePlayerTwo(nameInput);
    }
  };

  const handleKeyPress = (e) => {
    let playerNumber = Number(e.currentTarget.getAttribute('data-player-number'));
    if (playerNumber === 1 && e.key === 'Enter') {
      setIsInputOneVisible(false);
      if (nameInput) setNamePlayerOne(nameInput);
    }
    if (playerNumber === 2 && e.key === 'Enter') {
      setIsInputTwoVisible(false);
      if (nameInput) setNamePlayerTwo(nameInput);
    }
  };

  const handleInputChange = (e) => {
    setNameInput(e.currentTarget.value.toUpperCase());
  };

  return (
    <div className="App">
      {!gameFinished && <div className='display'>
        <span className='player-color-sign' style={activePlayer === 1 ? { backgroundColor: `${P1_COLOR}` } : { backgroundColor: `${P2_COLOR}` }}></span>
        <h2>{activePlayer === 1 ? namePlayerOne : namePlayerTwo}'s turn</h2>
      </div>}
      {gameFinished && <div className='display'>
        <h2>{winnerIs} won!</h2>
      </div>}
      <div className='container'>
        <div className='player-house'>
          <h2>
            <span className='player-color-sign' style={{ backgroundColor: `${P1_COLOR}` }}></span>
            {namePlayerOne}
          </h2>
          <h3>
            Score: {scores.playerOne}
          </h3>
          <div className='icon-box'>
            <GearIcon onClick={handleGearClick} data-player-number={1} className='icon' />
          </div>
          {isInputOneVisible && <div className='settings-box'>
            <input onChange={handleInputChange} onKeyDown={handleKeyPress} data-player-number={1} className='name-input' placeholder='Change name'></input>
            <DoneIcon onClick={handleDoneClick} data-player-number={1} className='icon' />
          </div>}
        </div>
        <div className='board'>
          {table.map((row, rowIndex) => (
            <div className='row' key={rowIndex}>
              {row.map((col, colIndex) => (
                <div className='cell' key={colIndex} data-child-id={`${colIndex}${rowIndex}`} onClick={handleCellClick}>
                  <div className='disk' id={`${colIndex}${rowIndex}`}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='player-house'>
          <h2>
            <span className='player-color-sign' style={{ backgroundColor: `${P2_COLOR}` }}></span>
            {namePlayerTwo}
          </h2>
          <h3>
            Score: {scores.playerTwo}
          </h3>
          <div className='icon-box'>
            <GearIcon onClick={handleGearClick} data-player-number={2} className='icon' />
          </div>
          {isInputTwoVisible && <div className='settings-box'>
            <input onChange={handleInputChange} onKeyDown={handleKeyPress} data-player-number={2} className='name-input' placeholder='Change name'></input>
            <DoneIcon onClick={handleDoneClick} data-player-number={2} className='icon' />
          </div>}
        </div>
      </div>
      {gameFinished && <button className='reset-button' onClick={startNewGame}>New Game</button>}
    </div>
  );
}

export default App;
