import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

import MenuItem from './components/menu/MenuItem'
import { IDepartment } from './typings/menu'
import SubMenu from './components/menu/SubMenu'

const CSS_HANDLES = ['menuContainer', 'menuFooterContainer'] as const

interface MenuProps {
  items: number
  allItems: boolean
  footer: boolean
}

const Menu = ({ items, allItems, footer }: MenuProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<IDepartment[]>()
  const [subCategories, setSubCategories] = useState<IDepartment[]>([])
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await axios.get('/api/catalog_system/pub/category/tree/2')

      if (allItems) setCategories(data.data)
      else setCategories(data.data.slice(data.data.lenght, items))
      // Slicing the array with the number if there's a quantity setted
      setIsLoading(false)
    }

    fetchAllCategories()
  })

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
              <MenuItem
                key={category.id}
                category={category}
                setShowSubMenu={setShowSubMenu}
                setSubCategories={setSubCategories}
                footer={footer}
              />
            )
          })}
        </div>
      )}
      {showSubMenu && (
        <SubMenu subCategories={subCategories} showSub={setShowSubMenu} />
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
