// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useCssHandles } from 'vtex.css-handles'
import { Button } from 'vtex.styleguide'
import { usePixel } from 'vtex.pixel-manager'

import { IShelf } from '../../typings/shelf'

interface AddToCartBtnProps {
  item: IShelf
  counter: number
}

const CSS_HANDLES = ['buttonContainer'] as const

const AddToCartBtn = ({ item, counter }: AddToCartBtnProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [product, setProduct] = useState<IShelf[]>()
  const { addItems } = useOrderItems()
  const { push } = usePixel()

  const addToCartHandler = () => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (product) {
      const data = [
        {
          additionalInfo: {
            brandName: product[0].brand,
            __typename: 'ItemAdditionalInfo',
          },
          availability:
            product[0].items[0].sellers[0].commertialOffer.IsAvailable,
          id: product[0].items[0].itemId,
          imageUrls: {
            at1x: product[0].items[0].images[0].imageUrl,
            __typename: 'ImageUrls',
          },
          listPrice: product[0].items[0].sellers[0].commertialOffer.ListPrice,
          measurementUnit: product[0].items[0].measurementUnit,
          name: product[0].productName,
          price: product[0].items[0].sellers[0].commertialOffer.Price,
          productId: product[0].productId,
          quantity: counter,
          seller: product[0].items[0].sellers[0].sellerId,
          sellingPrice:
            product[0].items[0].sellers[0].commertialOffer.ListPrice,
          skuName: product[0].items[0].nameComplete,
          unitMultiplier: product[0].items[0].unitMultiplier,
          uniqueId: product[0].items[0].itemId,
          isGift: false,
          __typename: 'Item',
        },
      ]

      addItems(data)

      push({
        id: 'add-to-cart-button',
        event: 'addToCart',
      })
    }
  }

  useEffect(() => {
    const fetchProd = async () => {
      const res = await axios.get(
        `/api/catalog_system/pub/products/search?fq=productId:${item.productId}`
      )

      setProduct(res.data)
    }

    fetchProd()
  }, [item])

  return (
    <div
      className={`${
        item.items[0].sellers[0].commertialOffer.IsAvailable
          ? `${handles.buttonContainer}`
          : `${handles.buttonContainer}--unavailable`
      }`}
    >
      <Button onClick={addToCartHandler}>
        {item.items[0].sellers[0].commertialOffer.IsAvailable
          ? 'Adicionar'
          : 'Indisponível'}
      </Button>
    </div>
  )
}

export default AddToCartBtn
