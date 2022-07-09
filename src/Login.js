import axios from 'axios';
import React,{useState,useContext} from 'react'
import { AppContext } from './App';



function Login() {
    const appContext=useContext(AppContext);
    const {setCookie,setIsLogged,navigate}=appContext;
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    
  

    const loginSubmitHandle=(e)=>{
        e.preventDefault();
        const url = process.env.REACT_APP_HOSTNAME + "login";
       
     
        axios.post(url,{
                email,
                password 
            }
        ).then((result)=>{
            let expires = new Date()
            expires.setTime(expires.getTime() + (result.data.expires_in))
            setCookie('token', result.data.token, { path: '/', expires,httpOnly: false })
            setIsLogged(true);
            navigate("/");

        }).catch((err) => {
            console.log("Some Error has occurred in login ", err);
            alert("Username/Password is incorrect.");
            setIsLogged(false);
            navigate("/login");
        })
    }

    const loginHandle=(e)=>{
        console.log(e.target.name);
        switch(e.target.name){
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }
    return (
        <div className='login'>
            <form className="my-form"  >
                <div className="my-form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="text" onChange={loginHandle} name="email" value={email} placeholder="Enter Your email" />
                </div>
                <div className="my-form-group">
                    <label htmlFor="password">Password : </label>
                    <input type="password" onChange={loginHandle} name="password" value={password} placeholder="Enter Your Password" />

                </div>  
                <button  onClick={loginSubmitHandle}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login