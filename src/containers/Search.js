import React,{useContext, useState} from 'react'
import { collection , getDoc, query, serverTimestamp, updateDoc, setDoc, doc, where,getDocs} from "firebase/firestore";
import {db} from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from '../context/ChatContext';
import { ToggleClassContext } from '../context/ToggleClassContext';

export const Search = () => {

  const [user,setUser] = useState();
  const [username,setUsername] = useState("");
  const [err,setErr] = useState();

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const {dispatchToggle} = useContext(ToggleClassContext);

  const handleSearch = async () => {
      const q = query(collection(db,"users"),where("displayName" ,"==" ,username));

      try{
        const querySnapshot = await getDocs(q);

        if(querySnapshot.size === 0)setErr(true);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });

      }catch(err){
        setErr(err);
      }
  }

  const handleKey = (e) => {
    e.code === "Enter" && username.length > 0 && handleSearch();
    if(e.code !== "Enter"){
      setUser(null);
      setErr(false);
    }
  }

  const handleSelect = async () => {

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{
        const res = await getDoc(doc(db,"chats",combinedId));

        if(!res.exists()){
          await setDoc(doc(db,"chats",combinedId),{messages:[]});

          await updateDoc(doc(db,"userChats",currentUser.uid) , { 
              [combinedId + ".userInfo"]:{
                uid:user.uid,
                displayName:user.displayName,
                photoURL:user.photoURL,
              },
              [combinedId+".date"]:serverTimestamp(),
          });
          
          await updateDoc(doc(db,"userChats",user.uid) , { 
            [combinedId + ".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL,
            },
            [combinedId+".date"]:serverTimestamp(),
        });


        }
    }catch(err){
      setErr(err);
      // console.log(err);
    }

    dispatch({type:"CHANGE_USER",payload:user})
    dispatchToggle({type:"CHANGE_CLASS"});
    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
        <div className="search-form">
            <input value={username} type="text" placeholder="find a user" onKeyDown={handleKey}  onChange={e => {setUsername(e.target.value); e.target.value==="" && setUser(null)}}/>
        </div>
        {err && <span className='error-message'>User not Found!!</span>}
        {user && <div className="user-chat" onClick={handleSelect}>
            <img src={user.photoURL} alt="user"></img>
            <div className="user-chat-info"> 
                <span>{user.displayName}</span>
            </div>
        </div>
        } 
    </div>
  )
}
