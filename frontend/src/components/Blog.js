import React from 'react'
import { NavLink } from 'react-router-dom'

const folder = "http://localhost:5000/images/"

function Blog({post}) {
  return (
    <>
      <div className='blog-item'>
          <div className='blog-thumb'>
            <img src={folder + post.photo} alt={post.title} />
          </div>
          <div className='blog-content'>
            <NavLink to={`/${post._id}`}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className='blog-category'>
                <h4>{new Date(post.createdAt).toDateString()}</h4>
                <h5></h5>
              </div>
            </NavLink>
          </div>
      </div>
    </>
  )
}

export default Blog
