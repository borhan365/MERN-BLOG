import React, { useContext } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Context } from '../context/Context'
import HeaderCategory from './HeaderCategory'
const authorProfile = "https://images.prothomalo.com/prothomalo-bangla%2F2020-10%2F19432014-7e20-4f0c-abd0-1f1f8523ffac%2FNishath.png?auto=format%2Ccompress&format=webp&w=160&dpr=1.0"

function Header() {
  const {user, dispatch} = useContext(Context);
  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }
  return (
    <>
      <section className='header-section'>
        <div className='container'>
          <div className='header-wrapper'>
              <ul>
              <li>
                  <NavLink to='/' className={(navinfo) => navinfo.isActive ? "activeNav" : ""}>HOME</NavLink>
                </li>
              </ul>

              <ul>
              { user && <li>
                <NavLink className="addnewpost" to='/profile' className={(navinfo) => navinfo.isActive ? "activeNav" : ""}>
                  <img src={authorProfile} alt="author link" />
                </NavLink>
              </li>}
              
              {
                user &&  <li>
                <NavLink className="addnewpost" to='/addnewpost' className={(navinfo) => navinfo.isActive ? "activeNav" : ""}><FaPlusCircle /> Add New Post</NavLink>
              </li>
              }

              {
                user ? (
                  <li onClick={handleLogout}>
                    <NavLink to='#' className="logout">LOGOUT</NavLink>
                  </li>
                ) : (
                  <ul>
                    <li>
                      <NavLink to='/login' className={(navinfo) => navinfo.isActive ? "activeNav" : ""}>LOGIN</NavLink>
                    </li>
                    <li>
                      <NavLink to='/register' className={(navinfo) => navinfo.isActive ? "activeNav" : ""}>REGISTER</NavLink>
                    </li>
                  </ul>
                )
              }
              
                  
              
              </ul>
          </div>
        </div>
      </section>
      <HeaderCategory />
    </>
  )
}

export default Header
