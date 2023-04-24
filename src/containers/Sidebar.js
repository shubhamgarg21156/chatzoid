import React, { useContext } from 'react'
import {Navbar} from './Navbar';
import {Search} from './Search';
import { Chats } from './Chats';
import { ToggleClassContext } from '../context/ToggleClassContext';

export const Sidebar = () => {

  const {data} = useContext(ToggleClassContext);

  return (
    <div className={`sidebar ${data.className}`}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}
