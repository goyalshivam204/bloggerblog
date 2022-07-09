import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import {storage} from "./firebase"


function SignUp() {
    const navigate=useNavigate();
    const appContext = useContext(AppContext);
    const { setCookie, removeCookie ,setIsLogged} = appContext;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUsername]=useState("");
    const [image,setImage]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const [progress, setProgress] = useState(0);

    const signUpSubmitHandle = (e) => {
        e.preventDefault();
      

        const uploadUser = (uploadUrl)=>{
            axios.post(url, { email, username, password ,image: uploadUrl}).then((result) => {
                if (result.data.success) {
                    let expires = new Date()
                    expires.setTime(expires.getTime() + (result.data.expires_in))
                    setCookie('token', result.data.token, { path: '/', expires, httpOnly: false })
                    setIsLogged(true);
                    navigate("/")
                } else {
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
        const uploadTask = storage.ref(`profile_images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(prog);
            },
            (error)=>{

            },
            ()=>{
                storage.ref("profile_images")
                .child(image.name)
                .getDownloadURL().then((url)=>{
                    setImageUrl(url);
                    console.log(url);
                    uploadUser(url);
                })
                
            }
        )

        console.log("after");
        const url = process.env.REACT_APP_HOSTNAME + "signup";

       
      
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
                    <label htmlFor="email">Email: </label>
                    <input type="text" onChange={signUpHandle} name="email" value={email} placeholder="Enter Your email" />
                </div>
                <div className="my-form-group">
                    <label htmlFor="username">username : </label>
                    <input type="text" onChange={signUpHandle} name="username" value={username} placeholder="Enter Your Username" />

                </div>
                <div className="my-form-group">
                    <label htmlFor="image">Profile Pic: </label>
                    <input type="file" onChange={signUpHandle} name="image"   />
                    <progress value={progress} max="100"></progress>
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