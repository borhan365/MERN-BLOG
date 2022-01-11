import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <>
      <div className='sidebar-header'>
        <div>LOGO</div>
        <div>x</div>
      </div>
      <div className='sidebar-pages'>
          <ul>
            <li> 
              {/* <NavLink to='/' className={(navinfo) => navinfo.isActive ? "activeNav" : ""}>HOME</NavLink> */}
            </li>
          </ul>
      </div>
    </>
  )
}

export default Sidebar
