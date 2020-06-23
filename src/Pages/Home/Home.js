import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css'
import io from 'socket.io-client';

import MyTextField from '../../Components/MaterialUI/MyTextField';
import MyButton from '../../Components/MaterialUI/MyButton';

let socket;

export default function Home() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [allRooms, setAllRooms] = useState([]);
    const [joinRoom, setJoinRoom] = useState('');
    const [joinButtonDisabled, setJoinButtonDisabled] = useState(true)
    const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const ENDPOINT = APIBaseUrl || 'localhost:5000';
    const history = useHistory()

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.on('getAllRooms', (rooms) => {
            console.log(rooms.rooms)
            setAllRooms(rooms.rooms)
        })

    }, [])

    useEffect(() => {
        if (name !== '') {
            setJoinButtonDisabled(false)
        } else {
            setJoinButtonDisabled(true)
        }
    }, [name])

    useEffect(() => {
        if (room !== '' && name !== '') {
            setCreateButtonDisabled(false)
        } else {
            setCreateButtonDisabled(true)
        }
    }, [name, room])

    function handleJoinButton(e, room) {
        setJoinRoom(room.room)
    }

    function OnClickEnter(e) {
        setRedirect(true)
        console.log(e)
    }

    useEffect(() => {
        if (redirect && room !== '' && name !== '') {
            history.push(`/room?name=${name}&room=${room}`)
        } else {
            setRedirect(false)
        }
    }, [redirect])

    return (
        // <div>
        /* <div className="home_title">
            HM Webchat
        </div> */

        <div className="home_boxes">

            <div className="home_body">
                <div className="home_type_name">
                    <MyTextField
                        variant="outlined"
                        label="Type your name here*"
                        onChange={(event) => setName(event)}
                        width='29ch'
                    />
                </div>
                <div className="create_room">

                    <MyTextField
                        value={joinRoom ? joinRoom : undefined}
                        variant="outlined"
                        label="New Room"
                        onChange={(event) => setRoom(event)}
                        OnClickEnter={(e) => OnClickEnter(e)}
                        width='18.5ch'
                    />
                    <Link
                        onClick={event => (!name || !room) ? event.preventDefault() : null}
                        to={`/room?name=${name}&room=${room}`} >
                        <MyButton
                            disabled={createButtonDisabled}
                            label="create"
                        />

                    </Link>
                </div>
            </div>

            <div className="all_rooms_table">
                Current Rooms
                <div className="all_rooms_table_body">

                    {allRooms ?
                        <div className="romm_options">
                            {allRooms.map((room) => (
                                <div key={room} className="each_room">
                                    <div className="room_name">
                                        {room}
                                    </div>
                                    <div className="room_join_button">
                                        <Link
                                            onClick={event => (!name || !room) ? event.preventDefault() + "please" : null}
                                            to={`/room?name=${name}&room=${room}`} >
                                            <MyButton
                                                label="Join"
                                                disabled={joinButtonDisabled}
                                                onCLick={(e) => handleJoinButton(e, { room })}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : null}
                </div>
            </div>
        </div>
        // </div >
    )
}