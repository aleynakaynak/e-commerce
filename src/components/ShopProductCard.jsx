import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getProductPath } from '../utils/helpers'

// API'den gelen ürün için kart (tıklanınca detay sayfasına gider)
function ShopProductCard({ product }) {
  const categories = useSelector((state) => state.product.categories)

  return (
    <Link
      to={getProductPath(product, categories)}
      className="flex flex-col items-center bg-white w-full sm:w-60 cursor-pointer hover:shadow-lg hover:scale-105 transition"
    >
      <img src={product.images[0]?.url} alt={product.name} className="w-full h-80 object-cover" />
      <div className="flex flex-col items-center gap-2 py-6 px-3 text-center">
        <h5 className="font-bold text-dark">{product.name}</h5>
        <p className="text-sm font-bold text-second">{product.description.slice(0, 40)}...</p>
        <div className="flex gap-2 font-bold">
          <span className="text-green-dark">{product.price} ₺</span>
        </div>
        <span className="text-xs text-second">⭐ {product.rating} · {product.sell_count} satış</span>
      </div>
    </Link>
  )
}

export default ShopProductCard
