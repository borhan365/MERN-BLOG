import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../context/Context';

const placeholder = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

function AddNewPost() {

  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState(''); 
  const [excerpt, setExcerpt] = useState(''); 
  const [file, setFile] = useState(null);
  const {user} = useContext(Context);
  const [category, setCategory] = useState([]); 
  const [checkedCategory, setCheckedCategory] = useState([]); 

  const handleCheckbox = (e) => {
    const categories = [];
    categories.push(e.target.value)
    setCheckedCategory([...checkedCategory, ...categories]);
    // console.log(checkedCategory);
    // console.log(categories);
  }

  useEffect(() => {
    const featchCategories = async () => {
      const dbcategory = await axios.get("/category")
      setCategory(dbcategory.data)
    }
    featchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      excerpt,
      desc,
      checkedCategory
    };
    console.log(newPost)
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/blog", newPost);
      
      window.location.replace("/" + res.data._id);
    } catch (err) {}
  };


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
                  <input autofocus type="text" placeholder="Enter your blog title" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='form-group'>
                  <label>Excerpt</label>
                  <textarea placeholder="Excerpt here" onChange={e => setExcerpt(e.target.value)}></textarea>
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
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} hidden />
                  </label>
`                    {file && (
                      <img src={URL.createObjectURL(file)} alt="" />
                    )}
              </div>
              <div className='single-category-wrapper'>
                <ul>
                  <h3>Select Category</h3>
                    {
                      category.map((cat, index) => (
                        <li key={index}>
                          <label>
                            <input value={cat._id} onChange={e => handleCheckbox(e)} type="checkbox" />
                            {cat.name}
                          </label>
                        </li>
                      ))
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

export default AddNewPost
