import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { useState  } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import HashLoader	 from "react-spinners/HashLoader";

export default function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
       await signInWithEmailAndPassword(auth,email,password);
       setLoading(false);
       setErr(false);
       navigate("/");
    }catch(err){
      setLoading(false);
        setErr(true);
    }
   }

   const override =  {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="form-container">
    <div className='form-wrapper'>
        <span className='logo'> Chatzoid </span>
        <span className='title'> Login  </span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='email' autoComplete="new-password"></input>
            <input type="password" placeholder='password' autoComplete="new-password"></input>
            <input type="file" id="file" style={ {display:"none"}}></input>
            <button>Sign in</button>
            <HashLoader	
              color={"red"}
              loading={loading}
              cssOverride={override}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {err && <p>Incorrect Username or Password!!</p>}
        </form>
        <p> <Link to="/register">New user? Register</Link></p>
    </div>
</div>
  )
}

