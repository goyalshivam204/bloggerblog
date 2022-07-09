import React from 'react'
import {Link,NavLink} from 'react-router-dom';


function BlogOverview({title,desc,image,author,_id}) {
  return (
    <div className='blog-overview'>
          <hr />  
          <div className="blog-author">
              <img className='author-img' src={author.image} alt="img" />
              <span className='author-name'>{author.username}</span>
          </div>
        <div className='blog'>
          <h3 className='blog-title small-screen' >{title}</h3>
            <div className="left">
                  <h3 className='blog-title large-screen' >{title}</h3>
                  <div className="blog-desc-container">
                    <p className='blog-desc'>{desc}</p>
                    <Link to={`/blog/${_id}`}>Read More...</Link> 
                  </div>

            </div>
            <div className="right">
                <img className='blog-img' src={image} alt="img" />
            </div>
         
            
        </div>
    </div>
  )
}

export default BlogOverview