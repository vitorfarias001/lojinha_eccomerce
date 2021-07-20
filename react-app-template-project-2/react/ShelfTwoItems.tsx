/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'
import { SliderLayout } from 'vtex.slider-layout'
import { Button, Input } from 'vtex.styleguide'

import { IShelf } from './typings/shelf'
import logo from './img/Imagem.png'

const CSS_HANDLES = [
  'shelfTwo',
  'shelfContainerTwo',
  'image',
  'titleShelf',
  'shelfImage',
  'renderImage',
  'subtitleShelf',
  'subtitleContent',
  'sliderLayoutContainer',
  'buttonContainer',
  'countContainer',
  'minimumButton',
  'maximumButton',
  'inputCount',
  'valueShelf',
  'valueOff',
  'Discount',
  'discountContainer',
  'discountContent',
]

const valueOff = (value: number) => {
  return value.toLocaleString('pt-BR', {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}

const Shelf = ({ discount }: ShelfProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [shelfWoman, setShelfWoman] = useState<IShelf[]>([])
  const [counter, setCounter] = useState(0)
  const incremeant = () => {
    setCounter((c) => c + 1)
  }

  const decrement = () => {
    setCounter((c) => (!c ? c : c - 1))
  }

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
        <div className={`${handles.image}`}>
          <img src={logo} />
        </div>
        <SliderLayout
          itemsPerPage={{ desktop: 2, phone: 2 }}
          className={`${handles.sliderLayoutContainer}`}
        >
          {shelfWoman.map((item) => {
            return (
              <div className={`${handles.shelfImage}`}>
                <div className={`${handles.discountContainer}`}>
                  <div className={`${handles.discountContent}`}>
                    {discount}% OFF
                  </div>
                </div>
                <div className={`${handles.renderImage}`}>
                  <img
                    src={item.items[0].images[0].imageUrl}
                    alt={item.items[0].name}
                  />
                  <div className={`${handles.subtitleShelf}`}>
                    <div className={`${handles.subtitleContent}`}>
                      <div>{item.items[0].name}</div>
                    </div>
                    <div className={`${handles.valueShelf}`}>
                      <div className={`${handles.valueOff}`}>
                        R$
                        {valueOff(
                          item.items[0].sellers[0].commertialOffer.Price * 0.9
                        )}
                      </div>
                      <div className={`${handles.Discount}`}>
                        R$
                        {valueOff(
                          item.items[0].sellers[0].commertialOffer.Price
                        )}
                      </div>
                    </div>
                    <div className={`${handles.countContainer}`}>
                      <div className={`${handles.minimumButton}`}>
                        <Button onClick={decrement}> - </Button>
                      </div>
                      <div className={`${handles.inputCount}`}>
                        <Input type="text" readOnly value={counter} />
                      </div>
                      <div className={`${handles.maximumButton}`}>
                        <Button onClick={incremeant}> + </Button>
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
    </div>
  )
}

type ShelfProps = {
  discount: number
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
