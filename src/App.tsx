import { useEffect, useState } from 'react'
import { Cart } from './components/Cart'
import { ProductList } from './components/ProductList'
import { PRODUCTS, type Product } from './data/products'
import type { CartItem } from './lib/cart'

type View = 'products' | 'cart'

export default function App() {
  const [view, setView] = useState<View>('products')
  const [items, setItems] = useState<CartItem[]>([])
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 1500)
    return () => clearTimeout(timer)
  }, [notice])

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setNotice(`「${product.name}」をカートに入れました`)
  }

  const increment = (productId: string) => {
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decrement = (productId: string) => {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (item.product.id !== productId) return [item]
        return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []
      }),
    )
  }

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="brand">Mini Shop</h1>
        <nav className="nav" aria-label="メイン">
          <button
            type="button"
            className={view === 'products' ? 'nav-link active' : 'nav-link'}
            onClick={() => setView('products')}
          >
            商品一覧
          </button>
          <button
            type="button"
            className={view === 'cart' ? 'nav-link active' : 'nav-link'}
            onClick={() => setView('cart')}
          >
            カート
          </button>
        </nav>
      </header>

      <main className="main">
        <div className="notice" role="status" aria-live="polite">
          {notice}
        </div>
        {view === 'products' ? (
          <ProductList products={PRODUCTS} onAdd={addToCart} />
        ) : (
          <Cart
            items={items}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={remove}
            onBackToProducts={() => setView('products')}
          />
        )}
      </main>
    </div>
  )
}
