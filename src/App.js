// React Imports
import React, { useState, useRef } from 'react';

// Component Impors
import Developer from './components/Developer';

// Style Imports
import './css/App.css';

// Icon Imports
import { AiOutlineClose as XIcon } from 'react-icons/ai';
import { BsCircle as OIcon } from 'react-icons/bs';

// Function Imports
import { checkHorizontal, checkVertical, checkDiagonalA, checkDiagonalB } from './js/winConditionChecks'
import { updateCellState, checkIsAvaliableCell, startNewGame } from './js/boardStateUpdates'
import { initializeMatrix } from './js/initializeMatrix'
import PlayerHouse from './components/PlayerHouse';

function App() {

  // Constants
  const winCount = 5; // Number of consecutive cells required to win
  const showIcons = true; // Toggle to show/hide player icons
  const winningBackground = 'rgb(38, 70, 38)'; // Background color for winning cells

  // State Hooks //
  // Game State Hooks
  const [matrix, setMatrix] = useState(initializeMatrix());

  // Cursor State Hooks
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursor, setIsCursor] = useState(false);

  // Player State Hooks
  const [activePlayer, setActivePlayer] = useState('A');
  const [isAvailableCell, setIsAvailableCell] = useState(true);
  const [isWinner, setIsWinner] = useState(false);

  // Player Settings State Hooks
  const [playerA, setPlayerA] = useState('Player - 1');
  const [playerB, setPlayerB] = useState('Player - 2');

  // Refs
  const refA = useRef();
  const refB = useRef();

  // Settings State Hooks
  const [isOpenBoxA, setIsOpenBoxA] = useState(false);
  const [isOpenBoxB, setIsOpenBoxB] = useState(false);

  // Score State Hooks
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  // Argument Configurations
  const winnerCheckProps = Object.values({
    matrix, activePlayer, winCount, scoreA, scoreB,
    setScoreA, setScoreB, setIsWinner, setMatrix,
  });

  const cellStateProps = Object.values({
    matrix, setMatrix, activePlayer, setActivePlayer
  });

  const checkIsAvaliableCelProps = Object.values({
    matrix, setIsAvailableCell
  });

  const startNewGameProps = Object.values({
    isWinner, setIsWinner, setIsAvailableCell, setMatrix, initializeMatrix, activePlayer, setActivePlayer
  });

  const playerAProps = {
    player: playerA,
    playerIcon: <OIcon className='icon' />,
    score: scoreA,
    focusRef: refA,
    setPlayer: setPlayerA,
    isOpenBox: isOpenBoxA,
    setIsOpenBox: setIsOpenBoxA,
  };

  const playerBProps = {
    player: playerB,
    playerIcon: <XIcon className='icon' />,
    score: scoreB,
    focusRef: refB,
    setPlayer: setPlayerB,
    isOpenBox: isOpenBoxB,
    setIsOpenBox: setIsOpenBoxB,
  };

  // Event Handlers
  // Handle cell click event
  function handleCellClick(x, y) {
    updateCellState(x, y, ...cellStateProps);
    checkIsAvaliableCell(...checkIsAvaliableCelProps);
    checkHorizontal(x, y, ...winnerCheckProps)
    checkVertical(x, y, ...winnerCheckProps);
    checkDiagonalA(x, y, ...winnerCheckProps);
    checkDiagonalB(x, y, ...winnerCheckProps);
  }

  // Handle reset button click event
  function handleResetClick() {
    startNewGame(...startNewGameProps)
  }

  // Handle mouse move event
  function handleMouseMove(e) {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="App" onMouseMove={handleMouseMove}>

      {isCursor && isAvailableCell && !isWinner &&
        <div
          className='cursor'
          style={{
            top: `${cursorPosition.y - 20}px`, left: `${cursorPosition.x + 20}px`
          }}>
          {activePlayer === 'A' ? playerA : playerB}
        </div>
      }

      <header style={isWinner || !isAvailableCell ? { backgroundColor: 'yellow' } : { backgroundColor: 'gray' }}>
        <div
          className='who-won'
          style={isWinner || !isAvailableCell ? { color: 'black' } : { color: 'white' }}
        >
          {isWinner ? activePlayer === 'A' ? `${playerB} won!` : `${playerA} won!` : !isAvailableCell ? 'No winner!' : 'Good luck!'}
        </div>
      </header>

      <main>

        <PlayerHouse {...playerAProps} />

        <div className='board' onMouseEnter={() => setIsCursor(true)} onMouseLeave={() => setIsCursor(false)}>
          {matrix.map((row, rIndex) =>
            <div className='row' key={rIndex}>
              {row.map((cell, cIndex) =>
                <div
                  className='cell'
                  key={cIndex}
                  onClick={() => handleCellClick(cIndex, rIndex)}
                  style={{
                    backgroundColor: matrix[rIndex][cIndex].player && !isWinner ? 'unset' : matrix[rIndex][cIndex].winCell === true ? winningBackground : '',
                    pointerEvents: isWinner ? 'none' : ''
                  }}>
                  {matrix[rIndex][cIndex].player === '' ? null : matrix[rIndex][cIndex].player === 'A' ? <div className='disk disk-A'>{showIcons && <OIcon className='icon' />}{!showIcons && `${cIndex}/${rIndex}`}</div> : <div className='disk disk-B'>{showIcons && <XIcon className='icon' />}{!showIcons && `${cIndex}/${rIndex}`}</div>}
                </div>
              )}
            </div>
          )}
        </div>

        <PlayerHouse {...playerBProps} />

      </main>

      <footer>
        <button className='reset-btn' onClick={handleResetClick}>New Game</button>
        <Developer />
      </footer>
    </div >
  );
}

export default App;
