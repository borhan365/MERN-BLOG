import React, {useState} from 'react'
import axios from 'axios'

function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(false)

    try {

      const res = await axios.post("/auth/register", {
        username,
        email, 
        password
      })

      res.data && window.location.replace("/login")

    } catch (err) {
      setError(true)
    }

  }

  return (
    <>
      <section className='form-section'>
        <div className='container'>
          <div className='form-wrapper'>
            <h2>Register</h2>
            {error && <span className='error'>Something went wrong</span>}
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Username</label>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Email Address</label>
                <input type="email" placeholder="email here" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='form-group'>
              <button className='form-button' type='submit'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
