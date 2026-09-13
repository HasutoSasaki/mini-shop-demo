export type Category = '食品' | '雑貨' | '文具' | 'アパレル'

export type Product = {
  id: string
  name: string
  price: number
  category: Category
  stock: number
  /** 商品画像の代わりに使う背景色 */
  color: string
}

export const PRODUCTS: Product[] = [
  { id: 'coffee-beans', name: 'コーヒー豆 200g', price: 1200, category: '食品', stock: 12, color: '#8B5E3C' },
  { id: 'dripper', name: 'コーヒードリッパー', price: 2900, category: '雑貨', stock: 5, color: '#4A6FA5' },
  { id: 'mug', name: 'マグカップ', price: 1800, category: '雑貨', stock: 8, color: '#5B8C5A' },
  { id: 'tumbler', name: 'タンブラー 350ml', price: 3200, category: '雑貨', stock: 0, color: '#6C757D' },
  { id: 'notebook', name: 'ノート A5', price: 600, category: '文具', stock: 30, color: '#D9A441' },
  { id: 'pen', name: 'ボールペン', price: 300, category: '文具', stock: 50, color: '#C0504D' },
  { id: 'tote', name: 'トートバッグ', price: 2400, category: 'アパレル', stock: 6, color: '#7E6B8F' },
  { id: 'tshirt', name: 'Tシャツ', price: 2500, category: 'アパレル', stock: 10, color: '#2E8B8B' },
]
