import React, { useState, useEffect } from 'react'

import { useCssHandles } from 'vtex.css-handles'

import { IDepartment } from '../../typings/menu'

import SubMenu from './SubMenu'

interface MenuItemProps {
  category: IDepartment
}

const CSS_HANDLES = [
  'categoryContainer',
  'categoryLink',
  'categoryName',
] as const

const MenuItem = ({ category }: MenuItemProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  const [subCategories, setSubCategories] = useState<IDepartment[]>([])

  useEffect(() => {
    if (category.hasChildren) setSubCategories(category.children)
  }, [])

  const showSub = () => {
    console.log('Category', category)
    console.log('Sub', subCategories)
    setShowSubMenu(true)
  }

  return (
    <div className={handles.categoryContainer}>
      {category.hasChildren ? (
        <div className={handles.categoryName} onClick={showSub}>
          {category.name}
        </div>
      ) : (
        <a
          className={handles.categoryLink}
          href={category.url}
          onClick={showSub}
        >
          {category.name}
        </a>
      )}
      {showSubMenu && <SubMenu subCategories={subCategories} />}
    </div>
  )
}

export default MenuItem
