import React, { useEffect, useState } from 'react'

import { useCssHandles } from 'vtex.css-handles'

import MenuItem from './components/menu/MenuItem'

import axios from 'axios'

const CSS_HANDLES = ['menuContainer'] as const

import { IDepartment } from './typings/menu'

const MENU_QUANTITY = 4

const Menu = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allCategories, setAllCategories] = useState<IDepartment[]>()
  const [categories, setCategories] = useState<IDepartment[]>()

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await axios.get('/api/catalog_system/pub/category/tree/2')
      setAllCategories(data.data)
      setCategories(data.data.slice(MENU_QUANTITY, data.data.lenght))
      setIsLoading(false)
    }
    fetchAllCategories()
  }, [])
  console.log('All', allCategories)
  console.log('Sliced', categories)
  return (
    <>
      {!isLoading && (
        <div className={handles.menuContainer}>
          {categories?.map((category) => {
            return <MenuItem key={category.id} category={category} />
          })}
        </div>
      )}
    </>
  )
}

export default Menu
