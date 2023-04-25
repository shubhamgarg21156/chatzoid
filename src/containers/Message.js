import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import moment from "moment";

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);
  
  //function to get the "Time ago" for a message.
  const getTimestamp = () => {
    
    const timestamp = message.date.toDate();

    const now = moment(); // Get the current time using moment.js
    const messageTime = moment(timestamp); // Create a moment.js object from the Firebase timestamp

    const diff = now.diff(messageTime); // Get the difference between the current time and message time
    const duration = moment.duration(diff); // Convert the difference to a moment.js duration object

    let timeAgo;
    if (duration.asSeconds() < 60) {
      timeAgo = "Just now";
    } else if (duration.asDays() >= 1) {
      timeAgo = `${Math.floor(duration.asDays())} day${Math.floor(duration.asDays()) > 1 ? 's' : ''} ago`;
    } else if (duration.asHours() >= 1) {
      timeAgo = `${Math.floor(duration.asHours())} hour${Math.floor(duration.asHours()) > 1 ? 's' : ''} ago`;
    } else {
      timeAgo = `${Math.floor(duration.asMinutes())} minute${Math.floor(duration.asMinutes()) > 1 ? 's' : ''} ago`;
    }
    
    return timeAgo;
    
  }

  return (
    <div ref = {ref} className={`message ${currentUser.uid === message.senderId && "owner"}`}>
      <div className='message-info'>
          <img src={currentUser.uid === message.senderId ? currentUser.photoURL : data.user.photoURL}/>
          <span>{getTimestamp()}</span>
      </div>
      <div className='message-content'>
        {message.text !== "" && <p>{message.text}</p>}
        {message.img && <img src={message.img}/>
        }
      </div>
    </div>
  )
}
