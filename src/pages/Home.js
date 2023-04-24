import React from 'react'
import { Sidebar } from '../containers/Sidebar';
import {Chat } from '../containers/Chat';
export const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
             <Sidebar />
             <Chat />
        </div>
    </div>
  )
}
