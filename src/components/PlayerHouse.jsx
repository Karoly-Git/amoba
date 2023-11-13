// React Imports
import React, { useEffect } from 'react'

// Icon Imports
import { BsFillGearFill as GearIcon } from 'react-icons/bs';
import { MdDone as DoneIcon } from 'react-icons/md';

export default function PlayerHouse(props) {
    useEffect(() => {
        if (props.isOpenBox) {
            props.focusRef.current.focus();
        }
    }, [props.isOpenBox]);

    return (
        <div className='player-house' onMouseLeave={() => props.setIsOpenBox(false)}>
            <div className='frame'>
                <h2>
                    {props.player}
                    {props.playerIcon}
                </h2>
                <h3>
                    Score: {props.score}
                </h3>
                <div className='settings-box'>
                    <input
                        ref={props.focusRef}
                        onChange={(e) => props.setPlayer(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Escape') {
                                props.setIsOpenBox(false)
                            }
                        }}
                        className='name-input'
                        placeholder='Name...'
                        style={{ opacity: `${props.isOpenBox ? '1' : '0'}` }}>

                    </input>
                    <GearIcon
                        onClick={() => {
                            props.setIsOpenBox(!props.isOpenBox);
                            props.focusRef.current.focus()
                        }}
                        className='icon gear-icon'
                        style={{ opacity: `${props.isOpenBox ? '0' : '1'}` }}
                    />
                    <DoneIcon
                        onClick={() => {
                            props.setIsOpenBox(!props.isOpenBox)
                        }}
                        className='icon done-icon'
                        style={{ opacity: `${props.isOpenBox ? '1' : '0'}` }}
                    />
                </div>
            </div>
        </div>
    )
}
