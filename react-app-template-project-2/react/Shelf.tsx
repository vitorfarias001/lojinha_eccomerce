// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'
import { SliderLayout } from 'vtex.slider-layout'

import { IShelf } from './typings/shelf'
import ShelfItem from './components/shelf/ShelfItem'

const CSS_HANDLES = ['shelfContainer']

type ShelfProps = {
  discount: number
}

const Shelf = ({ discount }: ShelfProps) => {
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
    <div className={`${handles.shelfContainer}`}>
      <SliderLayout itemsPerPage={{ desktop: 4, phone: 2 }}>
        {shelfWoman.map((item) => {
          return (
            <ShelfItem item={item} discount={discount} key={item.productId} />
          )
        })}
      </SliderLayout>
    </div>
  )
}

Shelf.schema = {
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

export default Shelf
