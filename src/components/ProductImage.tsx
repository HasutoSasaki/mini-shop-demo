import type { Product } from '../data/products'

type Props = { product: Product }

/** 商品画像の代わりに、色付きの枚に商品名を描く */
export function ProductImage({ product }: Props) {
  return (
    <svg className="product-image" viewBox="0 0 320 200" role="img" aria-label={product.name}>
      <rect width="320" height="200" rx="12" fill={product.color} />
      <text x="160" y="108" textAnchor="middle" fontSize="22" fontWeight="600" fill="#ffffff">
        {product.name}
      </text>
    </svg>
  )
}
