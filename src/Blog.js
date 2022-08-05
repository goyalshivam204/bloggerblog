import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from './App';
import axios from 'axios';
import Spinner from './Spinner';

function Blog() {
   
    const {blog_id}=useParams();
    const appContext=useContext(AppContext);
    const {currentBlog,setCurrentBlog,loading,setLoading}= appContext;
    
    const fetchBlog = (id) => {
        // setLoading(true);
        setCurrentBlog(false);
        const baseUrl = process.env.REACT_APP_HOSTNAME+"blog/"+id;
        console.log(baseUrl);
        axios.get(baseUrl).then((result) => {
            console.log(result.data);
            setCurrentBlog(result.data);
            // setLoading(false);

        }).catch((err) => {
            console.log("some error occurred in fetch blog: ", err);
        });
    }

    useEffect(()=>{
        fetchBlog(blog_id);
    },[])

  
    return (
       <div className='blog-detailed' >
            
            {currentBlog && 
                <>
                    <div className="blog-author">
                        <img className='author-img' src={ currentBlog.author.image} alt="img" />
                        <span className='author-name'>{currentBlog.author.username}</span>
                    </div>
                    <div className='blog'>
                        <h2 className='blog-title'>{currentBlog.title}</h2>
                        <div className="right">
                            <img className='blog-img' src={ currentBlog.image} alt="img" />
                        </div>
                        <p className='blog-desc'>{currentBlog.desc}</p>
                    </div>
                </>
            }
            {!currentBlog && 
                <Spinner/>
            }
            
        </div>

        
    )

}

export default Blog