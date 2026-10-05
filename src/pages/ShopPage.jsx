import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRight } from 'lucide-react'
import ShopProductCard from '../components/ShopProductCard'
import Pagination from '../components/Pagination'
import Spinner from '../components/Spinner'
import { fetchProducts, setFilter, setOffset } from '../store/actions/productActions'
import { getCategoryPath } from '../utils/helpers'

function ShopPage() {
  const { categoryId } = useParams()
  const dispatch = useDispatch()

  const { categories, productList, total, limit, offset, filter, fetchState } = useSelector(
    (state) => state.product,
  )

  // input ve select'in anlık değerleri; Filter'a basınca asıl state'e geçiyor
  const [filterInput, setFilterInput] = useState(filter)
  const [sortInput, setSortInput] = useState('')
  const [sort, setSort] = useState('')

  // kategori, sıralama, filtre ya da sayfa değişince ürünleri tekrar çek
  useEffect(() => {
    dispatch(fetchProducts({ category: categoryId, sort, filter, limit, offset }))
  }, [dispatch, categoryId, sort, filter, limit, offset])

  const handleFilter = (e) => {
    e.preventDefault()
    setSort(sortInput)
    dispatch(setFilter(filterInput))
    dispatch(setOffset(0))
  }

  // rating'e göre en iyi 5 kategori
  const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5)

  return (
    <div className="flex flex-col">
      {/* başlık + breadcrumb + kategoriler */}
      <section className="flex flex-col gap-8 bg-light px-8 lg:px-48 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
          <h3 className="text-2xl font-bold text-dark">Shop</h3>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="text-dark">Home</Link>
            <ChevronRight size={16} className="text-muted" />
            <span className="text-muted">Shop</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={getCategoryPath(category)}
              onClick={() => dispatch(setOffset(0))}
              className="relative flex-1"
            >
              <img src={category.img} alt={category.title} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white font-bold">
                <span>{category.gender === 'k' ? 'KADIN' : 'ERKEK'}</span>
                <span>{category.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* filtre satırı */}
      <section className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 px-8 lg:px-48 py-6">
        <span className="text-sm font-bold text-second">Showing all {total} results</span>

        <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ürün ara"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            className="border border-gray-300 bg-light rounded px-4 py-3 text-sm"
          />
          <select
            value={sortInput}
            onChange={(e) => setSortInput(e.target.value)}
            className="border border-gray-300 bg-light rounded px-4 py-3 text-sm text-second"
          >
            <option value="">Sıralama</option>
            <option value="price:asc">Fiyat (artan)</option>
            <option value="price:desc">Fiyat (azalan)</option>
            <option value="rating:asc">Puan (artan)</option>
            <option value="rating:desc">Puan (azalan)</option>
          </select>
          <button type="submit" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded">
            Filter
          </button>
        </form>
      </section>

      {/* ürünler */}
      <section className="flex flex-col items-center gap-12 px-8 pb-20">
        {fetchState === 'FETCHING' && (
          <div className="flex py-20">
            <Spinner />
          </div>
        )}

        {fetchState === 'FAILED' && <p className="text-danger py-20">Ürünler yüklenemedi.</p>}

        {fetchState === 'FETCHED' && productList.length === 0 && (
          <p className="text-second py-20">Ürün bulunamadı.</p>
        )}

        {fetchState === 'FETCHED' && (
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
            {productList.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination total={total} limit={limit} offset={offset} onChange={(newOffset) => dispatch(setOffset(newOffset))} />
      </section>
    </div>
  )
}

export default ShopPage
