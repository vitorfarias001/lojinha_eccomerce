// eslint-disable-next-line no-use-before-define
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { IDepartment } from '../../typings/menu'

interface SubMenuProps {
  subCategories: IDepartment[]
  showSub: () => void
}

const CSS_HANDLES = [
  'subMenuContainer',
  'subMenuLink',
  'subMenuItem',
  'subMenuContent',
  'subMenuItemsContainer',
  'subMenuImage',
] as const

const SubMenu = ({ subCategories, showSub }: SubMenuProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.subMenuContainer} onMouseLeave={() => showSub()}>
      <div className={handles.subMenuContent}>
        <div className={handles.subMenuItemsContainer}>
          {subCategories.map((subCategory) => {
            return (
              <div key={subCategory.id} className={handles.subMenuItem}>
                <a href={subCategory.url} className={handles.subMenuLink}>
                  {subCategory.name}
                </a>
              </div>
            )
          })}
        </div>
        <div className={handles.subMenuImage} />
      </div>
    </div>
  )
}

export default SubMenu
