import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'

function HeaderCategory() {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const featchCategory = async () => {
      const res = await axios.get("/category");
      setCategory(res.data)
    }
    featchCategory();
  }, [])

  return (
    <>
      <section className='header-category-section'>
        <div className='container'>
          <div className='header-wrapper header-category-wrapper'>
              <ul>
                {
                  category.map((category, index) => (
                    <li key={index}>
                      <NavLink to={`/category/${category._id}`} className={(navinfo) => navinfo.isActive ? "activeNav" : ""}>{category.name}</NavLink>
                    </li>
                  ))
                }
              </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeaderCategory
