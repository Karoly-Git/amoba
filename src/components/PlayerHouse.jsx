import React from 'react'
import { BsGear as GearIcon } from 'react-icons/bs';
import { MdDone as DoneIcon } from 'react-icons/md';

export default function PlayerHouse(props) {
    return (
        <div className='player-house'>
            <h2>
                <span className='player-color-sign' style={{ backgroundColor: `${props.playerColor}` }}></span>
                {props.playerName}
            </h2>
            <h3>
                Score: {props.playerScore}
            </h3>
            <div className='icon-box'>
                <GearIcon onClick={props.handleGearClick} data-player-number={props.playerNumber} className='icon' />
            </div>
            {props.isInputOneVisible && <div className='settings-box'>
                <input onChange={props.handleInputChange} onKeyDown={props.handleKeyPress} data-player-number={props.playerNumber} className='name-input' placeholder='Change name'></input>
                <DoneIcon onClick={props.handleDoneClick} data-player-number={props.playerNumber} className='icon' />
            </div>}
        </div>
    )
}
