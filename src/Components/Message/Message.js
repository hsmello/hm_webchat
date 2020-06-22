import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css'

export default function Message({ message: { user, text }, name }) {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ?
            (
                <div className="messageContainer justifyEnd">
                    <p className="sentBy currentUserName">{trimmedName}</p>
                    <div className="textContainer currentUserContainer">
                        <p className="sentText currentUserText">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            ) : (
                <div className="messageContainer justifyStart">
                    <div className="textContainer notCurrentUserContainer">
                        <p className="sentText">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentBy notCurrentUser">{user}</p>
                </div>
            )
    )
}