import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from '../context/ChatContext';

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  const logout = () => {
    dispatch({type:"LOG_OUT"});
    signOut(auth);
  }
  return (
    <div className='navbar'>
      <div className='logo'>Chatzoid</div>
      <div className='user'>
        <img src={currentUser.photoURL} alt=""></img>
        <span>{currentUser.displayName}</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}
