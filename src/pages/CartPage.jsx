import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2, Minus, Plus } from 'lucide-react'
import OrderSummary from '../components/OrderSummary'
import { changeCount, removeFromCart, toggleChecked } from '../store/actions/shoppingCartActions'

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)

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

      <OrderSummary>
        <Link to="/order" className="bg-primary text-white text-center font-bold py-3 rounded">
          Sepeti Onayla
        </Link>
      </OrderSummary>
    </div>
  )
}

export default CartPage
