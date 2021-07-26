import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

import MenuItem from './components/menu/MenuItem'
import { IDepartment } from './typings/menu'

const CSS_HANDLES = ['menuContainer', 'menuFooterContainer'] as const

interface MenuProps {
  items: number
  allItems: boolean
  footer: boolean
}

const Menu = ({ items, allItems, footer }: MenuProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const [categories, setCategories] = useState<IDepartment[]>()

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await axios.get('/api/catalog_system/pub/category/tree/2')

      if (allItems) setCategories(data.data)
      else setCategories(data.data.slice(items + 1, data.data.lenght))
      // Slicing the array with the number if there's a quantity setted
      setIsLoading(false)
    }

    fetchAllCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!isLoading && (
        <div
          className={
            footer ? handles.menuFooterContainer : handles.menuContainer
          }
        >
          {categories?.map((category) => {
            return (
              <MenuItem key={category.id} category={category} footer={footer} />
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
      description: '',
      type: 'boolean',
      default: false,
    },
    footer: {
      title: 'Determines if the menu is for the footer',
      description: '',
      type: 'boolean',
      default: false,
    },
  },
}

export default Menu
