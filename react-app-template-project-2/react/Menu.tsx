import React, { useEffect, useState } from 'react'

import axios from 'axios'

const Menu = () => {
  const [categories, setCategories] = useState()
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await axios.get('/api/catalog_system/pub/category/tree/2')
      setCategories(data.data)
    }
    fetchCategories()
  }, [])
  console.log(categories)
  return <h1>Menu</h1>
}

export default Menu
