export interface IShelf {
  brand: string
  brandId: number
  brandImageUrl?: string
  categories: string[]
  categoriesIds: string[]
  categoryId: string
  clusterHighlights: { [key: number]: string }
  description: string
  items: IShelfItems[]
  link: string
  linkText: string
  metaTagDescription: string
  productClusters: { [key: number]: string }
  productId: string
  productName: string
  productReference: string
  productReferenceCode?: number
  productTitle: string
  releaseDate: string
  searchableClusters: { [key: number]: string }
  skuSpecifications: IShelfSku[]
}

export interface IShelfItems {
  Cor: string[]
  Tamanho: string[]
  Videos: []
  complementName: string
  ean: string
  estimatedDateArrival?: string
  images: IShelfItemsImage[]
  isKit: boolean
  itemId: string
  measurementUnit: string
  modalType: string
  name: string
  nameComplete: string
  referenceId: IShlefItemsReferenceId[]
  sellers: IShelfItemsSellers[]
  unitMultiplier: number
  variations: string[]
}

export interface IShelfSku {
  field: {
    id: number
    name: string
    isActive: boolean
    position: number
    type: string
  }
  values: IShelfSkuValues[]
}
export interface IShelfSkuValues {
  id: string
  name: string
  position: number
}

export interface IShelfItemsImage {
  imageId: string
  imageLabel: string
  imageLastModified: string
  imageTag: string
  imageText: string
  imageUrl: string
}

export interface IShlefItemsReferenceId {
  Key: string
  Value: string
}

export interface IShelfItemsSellers {
  addToCartLink: string
  commertialOffer: ICommertialOffer
  sellerDefault: boolean
  sellerId: string
  sellerName: string
}

export interface ICommertialOffer {
  Price: number
  DeliverySlaSamplesPerRegion: {}
  Installments: []
  DiscountHighLight: []
  GiftSkuIds: []
  Teasers: []
  BuyTogether: []
  ItemMetadataAttachment: []
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: null
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  SaleChannel: number
  DeliverySlaSamples: []
  GetInfoErrorMessage: string
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: null
}

export interface IDeliverySlaSamplesPerRegion {
  [key: number]: {
    DeliverySlaPerTypes: string[]
    Region?: string
  }
}
