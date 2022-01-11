import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import {FaRegTrashAlt} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {Context} from '../context/Context'


const thumb = "https://img.thedailystar.net/sites/default/files/styles/big_202/public/images/2021/12/25/holiday.jpg?itok=HdCXALM1&timestamp=1640412018"
const folder = "http://localhost:5000/images/"

function Single() {

  const location = useLocation()
  const path = location.pathname.split("/")[1];
  const [post, setPost] = useState({});
  const {user} = useContext(Context)

  useEffect(() => {
    const featchSingle = async () => {
      const res = await axios.get(`/blog/${path}`)
      setPost(res.data)
    }
    featchSingle()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete(`/blog/${post._id}`, {data: {username: user.username}})
      window.location.replace("/")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className='single-section'>
        <div className='container'> 
          <div className='single-container'>

            <div className='single-meta'>
              <h1>{post.title}</h1>

              <div className='single-date-category-author'>
                <p>Date: <strong>{new Date(post.createdAt).toDateString()}</strong></p> |
                <p>Author: 
                  <NavLink to={`/?username=${post.username}`}> <strong>{post.username}</strong></NavLink>  
                </p> |
                <p>Category:  | </p>

                { 
                  post.username === user?.username && (
                    <div className='admin-action-btn'>
                      <FaRegTrashAlt onClick={handleDelete} />
                      <NavLink to={`/edit/${post._id}`}>
                        <FiEdit  />
                      </NavLink>
                    </div>
                  ) 
                }
              </div>

              { post.photo && 
                (
                  <div className='single-thumb'>
                  <img src={folder + post.photo} alt={post.title} />
                </div>
                )
              }

            </div>

            <div className='single-content'>
              <p>{post.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Single
