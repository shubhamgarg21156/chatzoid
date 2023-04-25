import React, { useContext, useState } from 'react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db , storage} from '../firebase';
import {v4  as uuid} from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const Input = () => {

  const [msg,setMsg] = useState("");
  const [img,setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
      if(img){
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on((error) => {
            // setErr(error);
        },() => {  
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              
            await updateDoc(doc(db,"chats",data.chatId),{
              messages:arrayUnion({
                id:uuid(),
                text:msg,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              })
            })
  
          })
      })
    }else{
      if(msg !== ""){
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
              id:uuid(),
              text:msg,
              senderId:currentUser.uid,
              date:Timestamp.now() 
            })
          })
      }
    }

    if(msg !== ""){
        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [data.chatId + ".lastMessage"] : {
            text:msg
          },
          [data.chatId + ".date"]:serverTimestamp(),
        });

        await updateDoc(doc(db,"userChats", data.user.uid),{
          [data.chatId + ".lastMessage"] : {
            text:msg
          },
          [data.chatId + ".date"]:serverTimestamp(),
        });
    }
      setMsg("");
      setImg(null);
  }

  const handleEnter = (e) => {
    e.code === "Enter" && handleSend();
  }
  return (
    <div className="input">
      {data.user.displayName && <>
      <input type="text" placeholder='Type Something...' value = {msg} onChange={e=>setMsg(e.target.value)} onKeyDown={handleEnter}></input>
      <div className='send'>
          <AttachFileOutlinedIcon />
          <input type = "file" id = "file" accept=".jpg, .jpeg, .png" style={{display:"none"}} onChange={e=>setImg(e.target.files[0])}/>
          <label htmlFor='file'>  <ImageOutlinedIcon /></label>
          <button onClick={handleSend}>Send</button>
      </div>
      </>
    }
    </div>
  )
}
