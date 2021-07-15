// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

import MenuItem from './components/menu/MenuItem'
import { IDepartment } from './typings/menu'

const CSS_HANDLES = ['menuFooterContainer'] as const

const Menu = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allCategories, setAllCategories] = useState<IDepartment[]>()

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await axios.get('/api/catalog_system/pub/category/tree/2')

      setAllCategories(data.data)
      setIsLoading(false)
    }

    fetchAllCategories()
  }, [])

  // eslint-disable-next-line no-console
  console.log('Footer All', allCategories)

  return (
    <>
      {!isLoading && (
        <div className={handles.menuFooterContainer}>
          {allCategories?.map((category) => {
            return <MenuItem key={category.id} category={category} footer />
          })}
        </div>
      )}
    </>
  )
}

export default Menu
