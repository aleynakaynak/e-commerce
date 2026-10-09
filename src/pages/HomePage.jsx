import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../api/axiosInstance'
import Slider from '../components/Slider'
import ShopProductCard from '../components/ShopProductCard'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'
import { getCategoryPath } from '../utils/helpers'
import { heroSlides, greenSlides, posts } from '../data/homeData'

function HomePage() {
  const categories = useSelector((state) => state.product.categories)
  const [products, setProducts] = useState([])

  // en yüksek puanlı ürünler: bestseller listesi ve sayfadaki görseller için
  useEffect(() => {
    api
      .get('/products', { params: { limit: 16, sort: 'rating:desc' } })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err))
  }, [])

  const imageOf = (index) => products[index]?.images[0]?.url

  // editor's pick için ürünü olan kategoriler (puana göre)
  const picks = [...categories]
    .filter((c) => c.gender === 'k')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* 1. hero slider */}
      <Slider
        slides={heroSlides}
        className="bg-gradient-to-r from-primary to-cyan-300"
        renderSlide={(slide) => (
          <div className="flex flex-col lg:flex-row items-center w-full px-8 lg:px-48 py-28 lg:py-0 min-h-[700px]">
            <div className="flex flex-col items-center lg:items-start gap-8 text-white text-center lg:text-left lg:w-1/2">
              <h5 className="font-bold">{slide.season}</h5>
              <h1 className="text-4xl lg:text-6xl font-bold">{slide.title}</h1>
              <p className="text-xl max-w-sm">{slide.text}</p>
              <Link to="/shop" className="bg-success text-2xl font-bold px-10 py-4 rounded">SHOP NOW</Link>
            </div>
            {imageOf(slide.id - 1) && (
              <img
                src={imageOf(slide.id - 1)}
                alt=""
                className="w-full lg:w-1/2 max-w-md h-[520px] object-cover rounded-lg mt-10 lg:mt-0"
              />
            )}
          </div>
        )}
      />

      {/* 2. editor's pick: kategoriler */}
      <section className="flex flex-col items-center bg-light px-8 py-20">
        <h3 className="text-2xl font-bold text-dark">EDITOR'S PICK</h3>
        <p className="text-sm text-second text-center mt-2 mb-12">Problems trying to resolve the conflict between</p>

        {picks.length === 4 && (
          <div className="flex flex-col lg:flex-row gap-7 w-full lg:w-auto">
            <Link to={getCategoryPath(picks[0])} className="relative">
              <img src={picks[0].img} alt={picks[0].title} className="w-full lg:w-[510px] h-[500px] object-cover" />
              <span className="absolute bottom-6 left-6 bg-white text-dark font-bold px-12 py-3">{picks[0].title.toLocaleUpperCase('tr')}</span>
            </Link>
            <Link to={getCategoryPath(picks[1])} className="relative">
              <img src={picks[1].img} alt={picks[1].title} className="w-full lg:w-60 h-[500px] object-cover" />
              <span className="absolute bottom-6 left-6 bg-white text-dark font-bold px-8 py-3">{picks[1].title.toLocaleUpperCase('tr')}</span>
            </Link>
            <div className="flex flex-col gap-4">
              {picks.slice(2).map((category) => (
                <Link key={category.id} to={getCategoryPath(category)} className="relative">
                  <img src={category.img} alt={category.title} className="w-full lg:w-60 h-60 object-cover" />
                  <span className="absolute bottom-5 left-5 bg-white text-dark font-bold px-6 py-3">{category.title.toLocaleUpperCase('tr')}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. bestseller ürünler (API'den) */}
      <section className="flex flex-col items-center px-8 py-20">
        <h4 className="text-xl text-second">Featured Products</h4>
        <h3 className="text-2xl font-bold text-dark text-center mt-2">BESTSELLER PRODUCTS</h3>
        <p className="text-sm text-second text-center mt-2 mb-16">Problems trying to resolve the conflict between</p>

        {products.length === 0 ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
            {products.slice(0, 8).map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. yeşil slider */}
      <Slider
        slides={greenSlides}
        className="bg-green-dark"
        renderSlide={(slide) => {
          const product = products[slide.id + 1]
          return (
            <div className="flex flex-col lg:flex-row items-center w-full px-8 lg:px-48 py-28 lg:py-0 min-h-[700px]">
              <div className="flex flex-col items-center lg:items-start gap-8 text-white text-center lg:text-left lg:w-1/2">
                <h5 className="text-xl">{slide.season}</h5>
                <h2 className="text-4xl lg:text-6xl font-bold">{product ? product.name : slide.title}</h2>
                <p className="text-sm max-w-sm">{product ? product.description : slide.text}</p>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {product && <span className="text-2xl font-bold">{product.price} ₺</span>}
                  <Link to="/shop" className="bg-success text-sm font-bold px-10 py-4 rounded">ADD TO CART</Link>
                </div>
              </div>
              {product && (
                <img
                  src={product.images[0]?.url}
                  alt=""
                  className="w-full lg:w-1/2 max-w-md h-[520px] object-cover rounded-lg mt-10 lg:mt-0"
                />
              )}
            </div>
          )
        }}
      />

      {/* 5. neural universe */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 px-8 lg:px-48 py-20">
        {imageOf(4) && <img src={imageOf(4)} alt="" className="w-full lg:w-1/2 max-w-md h-[520px] object-cover rounded-lg" />}
        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
          <h5 className="font-bold text-muted">SUMMER 2025</h5>
          <h2 className="text-4xl font-bold text-dark max-w-sm">Part of the Neural Universe</h2>
          <p className="text-xl text-second max-w-sm">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-col lg:flex-row gap-3">
            <Link to="/shop" className="bg-success text-white text-sm font-bold px-10 py-4 rounded">BUY NOW</Link>
            <Link to="/about" className="border border-success text-success text-sm font-bold px-10 py-4 rounded">READ MORE</Link>
          </div>
        </div>
      </section>

      {/* 6. featured posts */}
      <section className="flex flex-col items-center px-8 py-20">
        <h6 className="text-sm font-bold text-primary">Practice Advice</h6>
        <h2 className="text-4xl font-bold text-dark mt-2">Featured Posts</h2>
        <div className="flex flex-col lg:flex-row gap-8 mt-20">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={{ ...post, image: imageOf(i + 8) }} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
