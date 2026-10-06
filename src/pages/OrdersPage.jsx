import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import api from '../api/axiosInstance'
import Spinner from '../components/Spinner'

// kullanıcının önceki siparişleri (detaylar açılır kapanır)
function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    api
      .get('/order')
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-6 lg:px-48 py-12">
      <h3 className="text-2xl font-bold text-dark">Siparişlerim</h3>

      {orders.length === 0 && <p className="text-second">Henüz siparişin yok.</p>}

      {orders.map((order) => (
        <div key={order.id} className="flex flex-col border border-gray-300 rounded">
          <button
            onClick={() => setOpenId(openId === order.id ? null : order.id)}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 p-4 text-sm text-left"
          >
            <span className="font-bold text-dark">Sipariş #{order.id}</span>
            <span className="text-second">{new Date(order.order_date).toLocaleDateString('tr-TR')}</span>
            <span className="text-second">{order.products?.length || 0} ürün</span>
            <span className="font-bold text-primary sm:ml-auto">{order.price} ₺</span>
            {openId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openId === order.id && (
            <div className="flex flex-col gap-3 border-t border-gray-300 bg-light p-4">
              {order.products?.map((product, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  {product.images?.[0]?.url && (
                    <img src={product.images[0].url} alt="" className="w-12 h-16 object-cover rounded" />
                  )}
                  <span className="flex-1 font-bold text-dark">{product.name || product.detail}</span>
                  <span className="text-second">Adet: {product.count}</span>
                  {product.price && <span className="font-bold text-green-dark">{product.price} ₺</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default OrdersPage
