import React, { useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { IDepartment } from '../../typings/menu'

interface SubMenuProps {
  subCategories: IDepartment[]
  showSub: (arg0: boolean) => void
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
  })

  const closeSubMenuMouseLeaveHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const menuContainer = document.querySelector(
      '.avantivtexio-ic2-project-2-app-0-x-menuContainer'
    ) as HTMLDivElement

    if (menuContainer !== e.relatedTarget) {
      showSub(false)
    }
  }

  return (
    <div
      className={handles.subMenuContainer}
      onMouseLeave={
        window.innerWidth > 1024
          ? (e) => closeSubMenuMouseLeaveHandler(e)
          : undefined
      }
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
