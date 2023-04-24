import React, { useContext } from 'react'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import  Messages from './Messages';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToggleClassContext } from '../context/ToggleClassContext';

export const Chat = () => {
  
  const {data} = useContext(ChatContext);
  const toggleClass = useContext(ToggleClassContext).data.className;
  const {dispatchToggle} = useContext(ToggleClassContext);

  const handleBackClick = () => {
    dispatchToggle({type:"CHANGE_CLASS"}); 
  }

  return (
    
    <div className={`chat ${toggleClass === "open" ? "close" : "open"}`}>
      <div className='chat-info'>
          <span>
            <ArrowBackIcon className='back-icon' onClick={handleBackClick}/>
            {data.user?.displayName}
          </span>
          <div className='chat-icons'>
              <VideoCallOutlinedIcon />
              <GroupAddOutlinedIcon />
              <MoreHorizOutlinedIcon />
          </div>
      </div>

      <Messages />
      <Input />
    </div>
  )
}
