import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

import MyTextField from '../../Components/MaterialUI/MyTextField';
import MyButton from '../../Components/MaterialUI/MyButton';
import Input from '../../Components/Input/Input';

import './Room.css'

let socket;

export default function Loggedin({ location }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        // console.log(users)
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

    }, [messages])

    useEffect(() => {

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div>
            <div className="page_body">

                <div className="usersInRoom" >
                    <p>Room: {room}</p>
                    <p><a href="/" >Leave Room</a></p>
                </div>

                <div className="chat">
                    <Input messages={messages} name={name} />
                    <div className="send_message_components">
                        <div className="container">
                            <MyTextField
                                // variant="outline"
                                value={message}
                                onChange={(event) => setMessage(event)}
                                OnClickEnter={(event) => {
                                    console.log(event)
                                    sendMessage(event)
                                }}
                                width="600px"
                            />
                        </div>
                        <div className="container">
                            <MyButton
                                label="send"
                                onCLick={(event) => sendMessage(event)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}