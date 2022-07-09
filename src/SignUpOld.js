import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';



function SignUp() {
    const navigate=useNavigate();
    const appContext = useContext(AppContext);
    const { setCookie, removeCookie ,setIsLogged} = appContext;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUsername]=useState("");
    const [image,setImage]=useState("");


    const signUpSubmitHandle = (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_HOSTNAME + "signup";
        const formData=new FormData();
        formData.append('username',username);
        formData.append('email', email);
        formData.append('image', image,image.name);
        formData.append('password', password);

        // console.log(formData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(url,formData,config).then((result) => {
            if(result.data.success){
                let expires = new Date()
                expires.setTime(expires.getTime() + (result.data.expires_in))
                setCookie('token', result.data.token, { path: '/', expires, httpOnly: false })
                setIsLogged(true);
                navigate("/")
            }else{
                setIsLogged(false);
                removeCookie('token', { path: '/' });
                navigate("/")
            }
        }).catch((err) => {
            console.log("Some Error has occurred in signUp ", err);
            setIsLogged(false);
            navigate("/")
        })
      
    }

    const signUpHandle = (e) => {
        console.log(e.target);
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "username":
                setUsername(e.target.value);
                break;
            case  "image":
                setImage(e.target.files[0]);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            
            default:
                break;
        }
    }
    return (
        <div className='sign-up'>
            <form className="my-form"  >
                <div className="my-form-group">
                    <label htmlFor="email">User Name: </label>
                    <input type="text" onChange={signUpHandle} name="email" value={email} placeholder="Enter Your email" />
                </div>
                <div className="my-form-group">
                    <label htmlFor="username">username : </label>
                    <input type="text" onChange={signUpHandle} name="username" value={username} placeholder="Enter Your Username" />

                </div>
                <div className="my-form-group">
                    <label htmlFor="image">Profile Pic: </label>
                    <input type="file" onChange={signUpHandle} name="image"   />

                </div>
                <div className="my-form-group">
                    <label htmlFor="password">Password : </label>
                    <input type="password" onChange={signUpHandle} name="password" value={password} placeholder="Enter Your Password" />

                </div>
                <button onClick={signUpSubmitHandle}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SignUp;