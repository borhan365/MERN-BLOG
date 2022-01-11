import React from 'react'

function Login() {
  return (
    <>
      <div className='login-section'>
          <div className='login-wrapper'>
            <div></div>
            <div className='login-form'>
              <form>
                <div className='form-group'>
                  <label>Username</label>
                  <input type="text" placeholder='username' />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input type="password" placeholder='username' />
                </div>
                <button type='submit'>Login</button>
              </form>
            </div>
          </div>
      </div> 
    </>
  )
}

export default Login
