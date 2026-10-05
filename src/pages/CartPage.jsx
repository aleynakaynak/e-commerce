import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2, Minus, Plus } from 'lucide-react'
import { changeCount, removeFromCart, toggleChecked } from '../store/actions/shoppingCartActions'

const SHIPPING = 29.99

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)

  // sadece seçili ürünler toplama dahil
  const productsTotal = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.count * item.product.price, 0)

  // 150 TL üzeri kargo bedava (indirim olarak gösteriliyor)
  const discount = productsTotal >= 150 ? SHIPPING : 0
  const grandTotal = productsTotal > 0 ? productsTotal + SHIPPING - discount : 0

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24">
        <p className="text-second">Sepetin boş.</p>
        <Link to="/shop" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded">Alışverişe başla</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-48 py-12">
      {/* ürün listesi */}
      <div className="flex flex-col flex-1 gap-4">
        <h3 className="text-2xl font-bold text-dark">Sepetim ({cart.length} Ürün)</h3>

        {cart.map((item) => (
          <div key={item.product.id} className="flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-200 rounded p-4">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => dispatch(toggleChecked(item.product.id))}
              className="w-5 h-5"
            />
            <img src={item.product.images[0]?.url} alt="" className="w-20 h-28 object-cover rounded" />
            <span className="flex-1 font-bold text-dark">{item.product.name}</span>

            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={() => dispatch(changeCount(item.product.id, -1))} className="px-3 py-2 bg-light">
                <Minus size={14} />
              </button>
              <span className="px-4">{item.count}</span>
              <button onClick={() => dispatch(changeCount(item.product.id, 1))} className="px-3 py-2 bg-light">
                <Plus size={14} />
              </button>
            </div>

            <span className="w-28 font-bold text-green-dark sm:text-right">
              {(item.count * item.product.price).toFixed(2)} ₺
            </span>

            <button onClick={() => dispatch(removeFromCart(item.product.id))} className="text-second">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* sipariş özeti */}
      <div className="flex flex-col gap-4 lg:w-80">
        <div className="flex flex-col gap-3 border border-gray-200 rounded p-5 text-sm">
          <h4 className="text-xl font-bold text-dark">Sipariş Özeti</h4>
          <div className="flex justify-between">
            <span className="text-second">Ürünün Toplamı</span>
            <span className="font-bold">{productsTotal.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between">
            <span className="text-second">Kargo Toplam</span>
            <span className="font-bold">{SHIPPING} ₺</span>
          </div>
          <div className="flex justify-between">
            <span className="text-second">150 ₺ ve Üzeri Kargo Bedava</span>
            <span className="font-bold text-danger">-{discount.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="font-bold">Toplam</span>
            <span className="font-bold text-primary">{grandTotal.toFixed(2)} ₺</span>
          </div>
        </div>
        {/* sipariş oluşturma sonraki task'te yapılacak */}
        <button className="bg-primary text-white font-bold py-3 rounded">Sepeti Onayla</button>
      </div>
    </div>
  )
}

export default CartPage
