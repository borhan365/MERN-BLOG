import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'
import BlogData from '../components/data/blogData'

function Category() {

  const { catid } = useParams();
  const [ post, setPost] = useState([])

  useEffect(() => {
    const featchCategory = async () => {
      const res = await axios.get(`/blog/postbycatid/${catid}`)
      setPost(res.data);
      console.log(res.data);
    }
    featchCategory();
  }, [catid]);

  return (
    <>
      <section className='blog-section'>
          <div className='container'>
            <h1 className='title'>Category Page</h1>
            <div className='blog-wrapper'>
              {
                post.map((post, index) => (
                  <Blog key={index} post={post} />
                ))
              }
            </div>
        </div>
      </section>
    </>
  )
}

export default Category
