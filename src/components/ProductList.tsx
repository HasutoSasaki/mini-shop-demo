import type { Product } from '../data/products'
import { formatYen } from '../lib/cart'
import { ProductImage } from './ProductImage'

type Props = {
  products: Product[]
  onAdd: (product: Product) => void
}

export function ProductList({ products, onAdd }: Props) {
  return (
    <section>
      <h2 className="page-title">商品一覧</h2>
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <ProductImage product={product} />
            <div className="product-body">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{formatYen(product.price)}</p>
              <button type="button" className="btn btn-primary" onClick={() => onAdd(product)}>
                カートに入れる
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
