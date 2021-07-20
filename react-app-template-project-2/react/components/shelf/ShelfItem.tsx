// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Button, Input } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import { IShelf } from '../../typings/shelf'

interface ShelfItemProps {
  item: IShelf
  discount: number
}

const CSS_HANDLES = [
  'titleShelf',
  'shelfItem',
  'itemContent',
  'subtitleShelf',
  'subtitleContent',
  'buttonContainer',
  'countContainer',
  'minimumButton',
  'maximumButton',
  'minumumSign',
  'inputCount',
  'productImage',
  'valueShelf',
  'valueOff',
  'Discount',
  'discountContainer',
  'discountContent',
] as const

const valueOff = (value: number) => {
  return value.toLocaleString('pt-BR', {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}

const ShelfItem = ({ item, discount }: ShelfItemProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [counter, setCounter] = useState(0)

  const incremeant = () => {
    setCounter((c) => c + 1)
  }

  const decrement = () => {
    setCounter((c) => (!c ? c : c - 1))
  }

  return (
    <div className={`${handles.shelfItem}`} key={item.productId}>
      <div className={`${handles.itemContent}`}>
        <div className={`${handles.discountContainer}`}>
          <div className={`${handles.discountContent}`}>{discount}% OFF</div>
        </div>
        <img
          src={item.items[0].images[0].imageUrl}
          alt={item.items[0].name}
          className={handles.productImage}
        />
        <div className={`${handles.subtitleShelf}`}>
          <div className={`${handles.subtitleContent}`}>
            {item.items[0].name}
          </div>
          <div className={`${handles.valueShelf}`}>
            <div className={`${handles.Discount}`}>
              R$
              {valueOff(item.items[0].sellers[0].commertialOffer.Price)}
            </div>
            <div className={`${handles.valueOff}`}>
              R$
              {valueOff(item.items[0].sellers[0].commertialOffer.Price * 0.9)}
            </div>
          </div>
          {item.items[0].sellers[0].commertialOffer.IsAvailable ? (
            <div className={`${handles.countContainer}`}>
              <div className={`${handles.minimumButton}`}>
                <Button onClick={decrement}>
                  <div className={handles.minumumSign} />
                </Button>
              </div>
              <div className={`${handles.inputCount}`}>
                <Input type="text" readOnly value={counter} />
              </div>
              <div className={`${handles.maximumButton}`}>
                <Button onClick={incremeant}>
                  <div className={`${handles.minumumSign}`} />
                  <div className={`${handles.minumumSign}--vertical`} />
                </Button>
              </div>
            </div>
          ) : (
            <div className={`${handles.countContainer}`} />
          )}
          <div
            className={`${
              item.items[0].sellers[0].commertialOffer.IsAvailable
                ? `${handles.buttonContainer}`
                : `${handles.buttonContainer}--unavailable`
            }`}
          >
            <Button>
              {item.items[0].sellers[0].commertialOffer.IsAvailable
                ? 'Adicionar'
                : 'Indisponível'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShelfItem
