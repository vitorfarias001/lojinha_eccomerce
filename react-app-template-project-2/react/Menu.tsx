import React, { useEffect, useState } from 'react'

import { useCssHandles } from 'vtex.css-handles'

import axios from 'axios'

const CSS_HANDLES = [
  'menuContainer',
  'categoryContainer',
  'categoryLink',
  'categoryName',
] as const

import { IDepartment } from './typings/IMenu'

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
      setCategories(data.data.slice(0, MENU_QUANTITY))
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
            return (
              <div key={category.id} className={handles.categoryContainer}>
                <a href={`${category.name}`} className={handles.categoryLink}>
                  <div className={handles.categoryName}>{category.name}</div>
                </a>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Menu
