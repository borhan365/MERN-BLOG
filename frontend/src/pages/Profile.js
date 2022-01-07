import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import BlogData from '../components/data/blogData'
const authorProfile = "https://images.prothomalo.com/prothomalo-bangla%2F2020-10%2F19432014-7e20-4f0c-abd0-1f1f8523ffac%2FNishath.png?auto=format%2Ccompress&format=webp&w=160&dpr=1.0"

function Profile() {
  return (
    <>
      <section className='profile-section'>
        <div className='container'>
            <div className='profile-wrapper'>
              <div className='profile-card-wrapper'>
                  <div className='profile-thumb'>
                    <img src={authorProfile} alt='profile card' />
                  </div>
                  <div className='profile-content'>
                      <h2>Md Borhan Uddin</h2>
                      <p>Email: info.mdbohan@gmail.com</p>
                      <p>Bio: This is some dummy text about author its looks good for you and audience</p>
                  </div>
                  <div className='profile-social'>
                    <ul>
                      <li><FaFacebookF /></li>
                      <li><FaTwitter /></li>
                      <li><FaInstagram /></li>
                      <li><FaYoutube /></li>
                    </ul>
                  </div>
              </div>
              <div className='author-post-wrapper'>
                  {
                    BlogData.map((item, index) => (
                      <div className='profile-post-item' key={index}>
                          <div className='profile-post-thumb'>
                            <img src={item.img} alt={item.title} />
                          </div>
                          <div className='profile-post-content'>
                            <NavLink to="/single">
                                <h2>{item.title}</h2>
                                <p>{item.excerpt}</p>
                                <p>{item.createdAt}</p>
                                <p>{item.category}</p>
                            </NavLink>
                          </div>
                      </div>
                    ))
                  }
              </div>
            </div>
        </div>
      </section> 
    </>
  )
}

export default Profile
