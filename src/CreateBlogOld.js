import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';



function CreateBlog() {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const { setCookie, removeCookie, setIsLogged,cookies,setUser } = appContext;

    const [title,setTitle]=useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    

    const createBlogSubmitHandle = (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_HOSTNAME + "createblog";
        const formData = new FormData();

        console.log(desc);
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('image', image, image.name);
      

        // console.log(formData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.token
            },
        };

        axios.post(url, formData, config).then((result) => {
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
                  
                </div>
               
                <button onClick={createBlogSubmitHandle}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateBlog;