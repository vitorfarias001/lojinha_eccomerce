// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

import MenuItem from './components/menu/MenuItem'
import { IDepartment } from './typings/menu'

const CSS_HANDLES = ['menuContainer', 'menuFooterContainer'] as const

interface MenuProps {
  items: number
  allItems: boolean
}

const Menu = ({ items, allItems }: MenuProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allCategories, setAllCategories] = useState<IDepartment[]>()
  const [categories, setCategories] = useState<IDepartment[]>()

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await axios.get('/api/catalog_system/pub/category/tree/2')

      setAllCategories(data.data)
      if (allItems) setCategories(data.data)
      else setCategories(data.data.slice(items + 1, data.data.lenght))
      setIsLoading(false)
    }

    fetchAllCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line no-console
  console.log('All', allCategories)
  // eslint-disable-next-line no-console
  console.log('Sliced', categories)
  // eslint-disable-next-line no-console
  console.log('Footer', allItems)

  return (
    <>
      {!isLoading && (
        <div
          className={
            allItems ? handles.menuFooterContainer : handles.menuContainer
          }
        >
          {categories?.map((category) => {
            return (
              <MenuItem
                key={category.id}
                category={category}
                footer={allItems}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

Menu.schema = {
  title: 'Item Quantity',
  description: 'Number of items in the dynamic menu',
  type: 'object',
  properties: {
    items: {
      title: 'Number of the items to appear',
      description: 'Mind the total number of items',
      type: 'number',
      default: 4,
    },
    allItems: {
      title: 'All items options',
      description: 'Use true or false',
      type: 'boolean',
      default: false,
    },
  },
}

export default Menu
