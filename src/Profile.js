import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { AppContext } from './App'
import ProfileBlogs from './ProfileBlogs';
function Profile() {
    const appContext=useContext(AppContext);
    const {user,setUser,setMyBlogs,myBlogs,cookies}= appContext;
   

    const fetchMyBlogs= async ()=>{
        const baseUrl = process.env.REACT_APP_HOSTNAME + "myblogs";
        console.log(baseUrl);
        console.log(cookies.token);
        axios.get(baseUrl, {
            headers: {
                "x-access-token": cookies.token
            }
        }).then((result) => {
            // console.log(baseUrl)
            setUser(result.data.user)
            // console.log(result.data);
            setMyBlogs(result.data.blogs);
        }).catch((err) => {
            console.log("some error occurred in fetch My Blogs: ", err);
        });
    }
    useEffect(()=>{
      fetchMyBlogs();
    },[])
    return (

        <div className='profile'>
        {myBlogs && user && <>
                <div className="user-details">

                    <img className='profile-img' src={user.image} alt="img" />
                    <h1>
                        {user.username}
                    </h1>
                </div>
                <ProfileBlogs blogs={myBlogs} />
            </>
        }
        {!myBlogs && <div>Loading</div>}
        </div>
    )
}

export default Profile