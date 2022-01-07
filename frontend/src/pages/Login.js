import axios from 'axios';
import React, {useContext, useRef} from 'react'
import {Context} from '../context/Context';
import {ImSpinner2} from 'react-icons/im'

function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFeatching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START"})

    try {
      
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      });

      dispatch({type: "LOGIN_SUCCESS", payload: res.data})

      res.data && window.location.replace("/");

    } catch (error) {
      dispatch({type: "LOGIN_FAIL"})
    }
  }

  return (
    <>
      <section className='form-section'>
        <div className='container'>
          <div className='form-wrapper'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Username</label>
                <input type="name" placeholder="username here"
                ref={userRef}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input type="password" placeholder="password"
                ref={passwordRef}
                />
              </div>
              <div className='form-group'>
              <button className='form-button' type='submit' disabled={isFeatching}>Login {isFeatching && <ImSpinner2 />} </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
