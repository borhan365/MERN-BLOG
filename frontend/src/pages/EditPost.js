import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import { Context } from '../context/Context';

const placeholder = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
const folder = "http://localhost:5000/images/"

function EditPost() {

  const {user} = useContext(Context);
  const [post, setPost] = useState({});
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState(''); 
  const [excerpt, setExcerpt] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleCheckbox = (e) => {
    console.log(e)
  }

  const location = useLocation(); 
  const path = location.pathname.split('/')[2]

  useEffect(() => {
    const featchPosts = async () => {
      const res = await axios.get(`/blog/${path}`)
      setPost(res.data);
      setTitle(res.data.title);
      setExcerpt(res.data.excerpt);
      setDesc(res.data.desc);
      setPhoto(res.data.photo);
    }
    featchPosts();
  }, [path]);

  const handleSubmit = async (e) => {
    try {
      await axios.put(`/blog/${path}`, { username: user.username, title, desc, excerpt });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className='add-new-post-section'>
        <div className='container'>
          <div className='single-form-container'>
            <div className='left-wrapper'>
              <h2>Add New Post</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>Title</label>
                  <input value={title} type="text" placeholder="Enter your blog title" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='form-group'>
                  <label>Excerpt</label>
                  <textarea value={excerpt} placeholder="Excerpt here" onChange={e => setExcerpt(e.target.value)}></textarea>
                </div>
                <div className='form-group'>
                  <label>Description</label>
                  <ReactQuill theme="snow" value={desc} onChange={setDesc}/>
                </div>
                <div className='form-group'>
                  <button className='form-button' type='submit'>Publish</button>
                </div>
              </form>
            </div>
            <div className='right-wrapper'>
              <div className='featured-image'>
                  <label> <span className='featured-img-text'>Featured Image</span>
                  <img src={placeholder} alt='placeholder' />
                  {/* <input type="file" value={photo} onChange={(e) => setPhoto(e.target.files[0])} hidden /> */}
                  </label>
                      <img src={folder + photo} alt={post.title} />
              </div>
              <div className='single-category-wrapper'>
                <ul>
                  <h3>Select Category</h3>
                    {
                      // category.map((cat, index) => (
                      //   <li key={index}>
                      //     <label>
                      //       <input value={cat._id} onChange={e => handleCheckbox(e)} type="checkbox" />
                      //       {cat.name}
                      //     </label>
                      //   </li>
                      // ))
                    }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditPost
