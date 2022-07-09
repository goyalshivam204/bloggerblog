import React from 'react'
import {NavLink,Link} from 'react-router-dom';

function ProfileBlog({ title, desc, image, _id }) {
  return (
      <div className='profile-blog'>
          <hr />
        
          <div className='blog'>
              <h3 className='blog-title small-screen'>{title}</h3>

              <div className="left">
                  <h3 className='blog-title large-screen'>{title}</h3>
                  <p className='blog-desc'>{desc}</p>
                  <Link to={`/blog/${_id}`}>Read More...</Link>
              </div>
              <div className="right">
                  <img className='blog-img' src={ image} alt="img" />
              </div>
          </div>
      </div>
  )
}

export default ProfileBlog