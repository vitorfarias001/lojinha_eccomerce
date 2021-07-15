import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'
import { IShelf } from './typings/shelf'
import { SliderLayout } from 'vtex.slider-layout'
import { Button, Input } from 'vtex.styleguide'

const CSS_HANDLES = [
  'shelf',
  'shelfContainer',
  'titleShelf',
  'shelfImage',
  'renderImage',
  'subtitleShelf',
  'subtitleContent',
  'buttonContainer',
  'countContainer',
  'minimumButton',
  'maximumButton',
  'inputCount',
]
const Shelf = () => {
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
            <div className={`${handles.shelfImage}`}>
              <div className={`${handles.renderImage}`}>
                <img
                  src={item.items[0].images[0].imageUrl}
                  alt={item.items[0].name}
                  width={160}
                  height={160}
                />
                <div className={`${handles.subtitleShelf}`}>
                  <div className={`${handles.subtitleContent}`}>
                    <div>{item.items[0].name}</div>
                  </div>
                  <div className={`${handles.countContainer}`}>
                    <div className={`${handles.minimumButton}`}>
                      <Button />
                    </div>
                    <div className={`${handles.inputCount}`}>
                      <Input />
                    </div>
                    <div className={`${handles.maximumButton}`}>
                      <Button />
                    </div>
                  </div>
                  <div className={`${handles.buttonContainer}`}>
                    <Button>Adicionar</Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </SliderLayout>
    </div>
  )
}

export default Shelf
