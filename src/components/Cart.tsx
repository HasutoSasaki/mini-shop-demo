import { calcShipping, calcSubtotal, calcTotal, countItems, formatYen, type CartItem } from '../lib/cart'

type Props = {
  items: CartItem[]
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
  onRemove: (productId: string) => void
  onBackToProducts: () => void
}

export function Cart({ items, onIncrement, onDecrement, onRemove, onBackToProducts }: Props) {
  if (items.length === 0) {
    return (
      <section>
        <h2 className="page-title">カート</h2>
        <div className="empty">
          <p>カートに商品がありません。</p>
          <button type="button" className="btn btn-primary" onClick={onBackToProducts}>
            商品一覧へ
          </button>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="page-title">カート（{countItems(items)}点）</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>商品</th>
            <th>単価</th>
            <th>数量</th>
            <th>小計</th>
            <th aria-label="操作"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{formatYen(product.price)}</td>
              <td>
                <div className="qty">
                  <button type="button" aria-label="数量を減らす" onClick={() => onDecrement(product.id)}>
                    −
                  </button>
                  <span>{quantity}</span>
                  <button type="button" aria-label="数量を増やす" onClick={() => onIncrement(product.id)}>
                    ＋
                  </button>
                </div>
              </td>
              <td>{formatYen(product.price * quantity)}</td>
              <td>
                <button type="button" className="btn btn-link" onClick={() => onRemove(product.id)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="summary">
        <div>
          <dt>小計</dt>
          <dd>{formatYen(calcSubtotal(items))}</dd>
        </div>
        <div>
          <dt>送料</dt>
          <dd>{formatYen(calcShipping(items))}</dd>
        </div>
        <div className="summary-total">
          <dt>合計</dt>
          <dd>{formatYen(calcTotal(items))}</dd>
        </div>
      </dl>

      <div className="actions">
        <button type="button" className="btn btn-secondary" onClick={onBackToProducts}>
          買い物を続ける
        </button>
      </div>
    </section>
  )
}
