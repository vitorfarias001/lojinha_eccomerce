import React from 'react'

import { useCssHandles } from 'vtex.css-handles'

import { IDepartment } from '../../typings/menu'

interface SubMenuProps {
  subCategories: IDepartment[]
}

const CSS_HANDLES = ['subMenuContainer', 'subMenuLink', 'subMenuItem'] as const

const SubMenu = ({ subCategories }: SubMenuProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.subMenuContainer}>
      {subCategories.map((subCategory) => {
        return (
          <div className={handles.subMenuItem}>
            <a
              key={subCategory.id}
              href={subCategory.url}
              className={handles.subMenuLink}
            >
              {subCategory.name}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default SubMenu
