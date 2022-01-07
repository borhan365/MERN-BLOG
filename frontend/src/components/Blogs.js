import React, {useState, useEffect} from 'react'
import Blog from './Blog'
import axios from 'axios'
import { useLocation } from 'react-router';


function Blogs() {

  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const featchPosts = async () => {
      const res = await axios.get("/blog" + search)
      setPosts(res.data)
    }
    featchPosts();
  }, [search])

  return (
    <>
      <section className='blog-section'>
          <div className='container'>
            <div className='blog-wrapper'>
              {
                posts.map((post, index) => (
                  <Blog key={index} post={post} />
                ))
              }
            </div>
        </div>
      </section>
    </>
  )
}

export default Blogs
