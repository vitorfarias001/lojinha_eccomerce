/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/aria-role */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { IDepartment } from '../../typings/menu'
import SubMenu from './SubMenu'

interface MenuItemProps {
  category: IDepartment
  footer: boolean
}

const CSS_HANDLES = [
  'categoryContainer',
  'categoryLink',
  'categoryName',
  'footerCategoryName',
] as const

const MenuItem = ({ category, footer }: MenuItemProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  const [subCategories, setSubCategories] = useState<IDepartment[]>([])

  useEffect(() => {
    if (category.hasChildren) setSubCategories(category.children)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showSub = () => {
    /*     console.log('Category', category)
    console.log('Sub', subCategories) */
    setShowSubMenu(!showSubMenu)
  }

  return (
    <div className={handles.categoryContainer}>
      {category.hasChildren || footer ? (
        <div
          role="Link"
          className={footer ? handles.footerCategoryName : handles.categoryName}
          onMouseEnter={
            footer ? undefined : window.innerWidth > 1024 ? showSub : undefined
          }
          onClick={
            footer ? undefined : window.innerWidth <= 1024 ? showSub : undefined
          }
        >
          {category.name}
        </div>
      ) : (
        <a
          className={footer ? handles.footerCategoryName : handles.categoryName}
          href={category.url}
          onClick={showSub}
        >
          {category.name}
        </a>
      )}
      {showSubMenu && (
        <SubMenu subCategories={subCategories} showSub={showSub} />
      )}
    </div>
  )
}

export default MenuItem
