import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { storage } from "./firebase"



function CreateBlog() {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const { setCookie, removeCookie, setIsLogged,cookies,setUser } = appContext;

    const [title,setTitle]=useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl,setImageUrl]= useState("");
    const [progress,setProgress]=useState(0);

    const createBlogSubmitHandle = (e) => {
        e.preventDefault();

       
      

        // console.log(formData);

        const config = {
            headers: {
                'x-access-token': cookies.token
            }
        };

        const uploadBlog=(uploadUrl)=>{
            const url = process.env.REACT_APP_HOSTNAME + "createblog";
            axios.post(url, {
                title, desc, image: uploadUrl
            },config).then((result) => {
                if (result.data) {
                    console.log(result.data.user);
                    setUser(result.data.user);

                    navigate("/")
                } else {
                    setUser(null);
                }
            }).catch((err) => {
                console.log("Some Error has occurred in create blog ", err);
                navigate("/")
            })
        }
        const uploadTask = storage.ref(`blog_images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                setProgress(prog);
            },
            (error) => {

            },
            () => {
                storage.ref("blog_images")
                    .child(image.name)
                    .getDownloadURL().then((url) => {
                        setImageUrl(url);
                        console.log(url);
                        uploadBlog(url);
                    })

            }
        )

    }

    const createBlogHandle = (e) => {
        switch (e.target.name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "desc":
                setDesc(e.target.value);
                
                break;
            case "image":
                setImage(e.target.files[0]);
                break;
            default:
                break;
        }
    }
    return (
        <div className='create-blog'>
            <form className="my-form"  >
                <div className="my-form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" required onChange={createBlogHandle} name="title" value={title} placeholder="title" />
                </div>
                <div className="my-form-group">
                    <label htmlFor="desc">Write You're Blog : </label>
                    <textarea rows='500' required onChange={createBlogHandle} name="desc" value={desc} placeholder="Description" />

                </div>
                <div className="my-form-group">
                    <label htmlFor="image">Image : </label>
                    <input required type="file" onChange={createBlogHandle} name="image" />
                    <progress value={progress} max="100"></progress>
                </div>
               
                <button onClick={createBlogSubmitHandle}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateBlog;