/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'
import { SliderLayout } from 'vtex.slider-layout'

import { IShelf } from './typings/shelf'
import ShelfItem from './components/shelf/ShelfItem'

const CSS_HANDLES = [
  'shelfTwo',
  'shelfContainerTwo',
  'imageContainer',
  'image',
  'sliderLayoutContainerTwo',
]

type ShelfTwoItemsProps = {
  discount: number
}

const ShelfTwoItems = ({ discount }: ShelfTwoItemsProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [shelfWoman, setShelfWoman] = useState<IShelf[]>([])

  useEffect(() => {
    axios
      .get('/api/catalog_system/pub/products/search/woman')
      .then((response) => {
        setShelfWoman(response.data)
      })
  }, [])

  return (
    <div className={`${handles.shelfTwo}`}>
      <div className={`${handles.shelfContainerTwo}`}>
        <div className={handles.imageContainer}>
          <img
            src="https://avantivtexio.vtexassets.com/assets/vtex/assets-builder/avantivtexio.ic2-store-theme-project-2/4.4.0/images/Imagem___d8d23cc355f560db715bccb57594e7dd.png"
            className={handles.image}
          />
        </div>
        <SliderLayout itemsPerPage={{ desktop: 2, phone: 2 }}>
          {shelfWoman.map((item) => {
            return (
              <ShelfItem item={item} discount={discount} key={item.productId} />
            )
          })}
        </SliderLayout>
      </div>
    </div>
  )
}

ShelfTwoItems.schema = {
  title: 'Shelf',
  description: 'Shelf Items',
  type: 'object',
  properties: {
    discount: {
      title: 'porcentagem',
      description: 'number',
      type: 'number',
      default: '10',
    },
  },
}

export default ShelfTwoItems
