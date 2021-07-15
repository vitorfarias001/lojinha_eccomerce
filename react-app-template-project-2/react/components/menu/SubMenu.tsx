// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
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

  const changeCss = () => {
    const subMenuContainer = document.querySelector(
      `.${handles.subMenuContainer}`
    ) as HTMLDivElement

    subMenuContainer.style.display = 'flex'
    setTimeout(() => {
      subMenuContainer.style.opacity = '1'
    }, 50)
  }

  useEffect(() => {
    changeCss()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={handles.subMenuContainer}
      onMouseLeave={window.innerWidth > 1024 ? () => showSub() : undefined}
      onLoad={changeCss}
    >
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
