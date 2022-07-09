import React from 'react'
import ProfileBlog from './ProfileBlog';

function ProfileBlogs({blogs}) {
  return (
      <div className='profile-blogs'>
        
          {blogs.map((blog, ind) => {
              return (
                  <ProfileBlog key={ind} {...blog} />
              );
          })}
      </div>
  )
}

export default ProfileBlogs