import React from 'react'
import BlogOverview from './BlogOverview';

function BlogsOverview({blogs}) {
    return (
        <div className='blogs-overview'>
            <h1>Explore</h1>
            {blogs.map((blog, ind) => {
                return (
                    <BlogOverview key={ind} {...blog} />
                );
            })}
        </div>
    )
}

export default BlogsOverview