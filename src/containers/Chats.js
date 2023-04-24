import { onSnapshot , doc} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import DefaultProfile from "../images/default_pfp.jpg";
import { ToggleClassContext } from '../context/ToggleClassContext';

export const Chats = () => {
  const [chats,setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const {dispatchToggle} = useContext(ToggleClassContext);

  useEffect(() => {
   
    const getChats = () => {
      const unsub = onSnapshot(doc(db,"userChats",currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats();
  } , [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER",payload:u});
    dispatchToggle({type:"CHANGE_CLASS"});
  }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="user-chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo?.photoURL ? chat[1].userInfo?.photoURL : DefaultProfile}></img>
          <div className="user-chat-info"> 
              <span>{chat[1].userInfo?.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
       
    </div>
  )
}
