import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);
  
  return (
    <div ref = {ref} className={`message ${currentUser.uid === message.senderId && "owner"}`}>
      <div className='message-info'>
          <img src={currentUser.uid === message.senderId ? currentUser.photoURL : data.user.photoURL}/>
          <span>Just Now</span>
      </div>
      <div className='message-content'>
        {message.text !== "" && <p>{message.text}</p>}
        {message.img && <img src={message.img}/>
        }
      </div>
    </div>
  )
}
