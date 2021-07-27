import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { IDepartment } from '../../typings/menu'
import SubMenu from './SubMenu'

interface MenuItemProps {
  category: IDepartment
  footer: boolean
  setShowSubMenu: (arg0: boolean) => void
  setSubCategories: (arg0: IDepartment[]) => void
}

const CSS_HANDLES = [
  'categoryContainer',
  'footerCategoryContainer',
  'categoryLink',
  'categoryName',
  'footerCategoryName',
] as const

const MenuItem = ({
  category,
  footer,
  setSubCategories,
  setShowSubMenu,
}: MenuItemProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [showSubMenuDrawer, setShowSubMenuDrawer] = useState<boolean>(false)

  return (
    <div
      className={
        footer ? handles.footerCategoryContainer : handles.categoryContainer
      }
    >
      {category.hasChildren && !footer ? (
        <div
          role="Link"
          className={footer ? handles.footerCategoryName : handles.categoryName}
          onMouseEnter={
            footer
              ? undefined
              : window.innerWidth > 1024
              ? () => {
                  setShowSubMenu(true)
                  setSubCategories(category.children)
                }
              : undefined
          }
          onClick={
            footer
              ? undefined
              : window.innerWidth <= 1024
              ? () => {
                  setShowSubMenuDrawer(!showSubMenuDrawer)
                }
              : undefined
          }
        >
          {category.name}
        </div>
      ) : (
        <a
          className={footer ? handles.footerCategoryName : handles.categoryName}
          href={category.url}
        >
          {category.name}
        </a>
      )}
      {showSubMenuDrawer && (
        <SubMenu subCategories={category.children} showSub={setShowSubMenu} />
      )}
    </div>
  )
}

export default MenuItem
