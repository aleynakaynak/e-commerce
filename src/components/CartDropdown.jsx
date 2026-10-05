import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'

function CartDropdown() {
  const [open, setOpen] = useState(false)
  const cart = useSelector((state) => state.shoppingCart.cart)

  const itemCount = cart.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="relative flex">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
        <ShoppingCart size={18} /> {itemCount}
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-20 flex flex-col gap-3 bg-white text-dark shadow-lg rounded p-4 w-80">
          <h6 className="font-bold">Sepetim ({itemCount} Ürün)</h6>

          {cart.length === 0 && <p className="text-sm text-second font-normal">Sepetin boş.</p>}

          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-3 border-b border-gray-200 pb-3">
              <img src={item.product.images[0]?.url} alt="" className="w-14 h-20 object-cover rounded" />
              <div className="flex flex-col gap-1 text-sm font-normal">
                <span className="font-bold">{item.product.name}</span>
                <span className="text-second">Adet: {item.count}</span>
                <span className="text-green-dark font-bold">{item.product.price} ₺</span>
              </div>
            </div>
          ))}

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="bg-primary text-white text-center text-sm py-2 rounded"
          >
            Sepete Git
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartDropdown
