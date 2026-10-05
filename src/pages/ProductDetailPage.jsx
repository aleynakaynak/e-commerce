import { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from 'lucide-react'
import Spinner from '../components/Spinner'
import { fetchProduct } from '../store/actions/productActions'
import { addToCart } from '../store/actions/shoppingCartActions'

function ProductDetailPage() {
  const { productId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { product, fetchState } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProduct(productId))
  }, [dispatch, productId])

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toast.success('Ürün sepete eklendi')
  }

  if (fetchState === 'FAILED') {
    return <p className="text-danger text-center py-20">Ürün yüklenemedi.</p>
  }

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-light px-8 lg:px-48 py-8 gap-8">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
        <button onClick={() => history.goBack()} className="flex items-center gap-1 text-sm font-bold text-primary">
          <ChevronLeft size={18} /> Geri
        </button>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link to="/" className="text-dark">Home</Link>
          <ChevronRight size={16} className="text-muted" />
          <Link to="/shop" className="text-muted">Shop</Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <img src={product.images[0]?.url} alt={product.name} className="w-full lg:w-1/2 max-h-[550px] object-cover rounded" />

        <div className="flex flex-col gap-4 lg:w-1/2">
          <h4 className="text-xl text-dark">{product.name}</h4>
          <span className="text-sm font-bold text-second">⭐ {product.rating} · {product.sell_count} satış</span>
          <h3 className="text-2xl font-bold text-dark">{product.price} ₺</h3>
          <p className="text-sm font-bold text-second">
            Availability : <span className="text-primary">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </p>
          <p className="text-sm text-second border-b border-muted pb-6">{product.description}</p>

          <div className="flex gap-2">
            <span className="w-7 h-7 rounded-full bg-primary"></span>
            <span className="w-7 h-7 rounded-full bg-success"></span>
            <span className="w-7 h-7 rounded-full bg-orange-500"></span>
            <span className="w-7 h-7 rounded-full bg-dark"></span>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button onClick={handleAddToCart} className="bg-primary text-white text-sm font-bold px-5 py-3 rounded">
              Add to Cart
            </button>
            <span className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full bg-white"><Heart size={18} /></span>
            <span className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full bg-white"><ShoppingCart size={18} /></span>
            <span className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full bg-white"><Eye size={18} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
