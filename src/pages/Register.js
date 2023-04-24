import React, { useState } from 'react'
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth , storage} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigate , Link} from 'react-router-dom';
import DefaultProfile from "../images/default_pfp.jpg";
import HashLoader	 from "react-spinners/HashLoader";

export default function Register() {

  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [pfp,setPfP] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if(password.length < 6){
      setLoading(false);
      setErr("Password must be atleast 6 characters long!!");
      return;
    }

    try{
      const defaultProfileFile = await fetch(DefaultProfile)
      .then(response => response.blob())
      .then(blob => new File([blob], "default_pfp.jpg", { type: "image/jpeg" }));
      
      const profilePicture = file ? file : defaultProfileFile;

      const res = await createUserWithEmailAndPassword(auth, email, password)
     
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, profilePicture);

      uploadTask.on((error) => {
          setErr("Something went wrong!!");
      },() => {  
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid:res.user.uid,
            displayName,
            email,
            photoURL:downloadURL
          });
          
          await setDoc(doc(db,"userChats", res.user.uid),{});
          
          setLoading(false);
          setErr("");
          navigate("/");
        })
      })
    }catch(err){
        setLoading(false);
        setErr("Something went wrong!!");
      }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setPfP(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const override =  {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="form-container">
        <div className='form-wrapper'>
            <span className='logo'> Chatzoid </span>
            <span className='title'> Register </span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="user name" autoComplete="new-password" required></input>
                <input type="email" placeholder='email' autoComplete="new-password" required></input>
                <input type="password" placeholder='password' autoComplete="new-password" required></input>
                <input type="file" id="file" style={ {display:"none"} } onChange={handleFileUpload}></input>
                <div className="avatar"> 
                  <img src={pfp ? pfp : DefaultProfile}></img>
                  <label htmlFor='file'>
                      <span>Add an Avatar</span>
                  </label>
                </div>
                <button>Sign Up</button>
                <HashLoader	
                  color={"#311e69"}
                  loading={loading}
                  cssOverride={override}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              />
                {err && <p>{err}</p>}
            </form>
            <p><Link to="/login">Already have an account? Login</Link></p>
        </div>
    </div>
  )
}
