import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <section className='footer-section'>
        <div className='container'>
          <div className='footer-wrapper'>
              <ul>
                <li>
                  @ Copyright all right reserved.
                </li>
                <li>
                  <NavLink to='#'>Website Design & Developed By Md Borhan Uddin</NavLink>
                </li>
              </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
