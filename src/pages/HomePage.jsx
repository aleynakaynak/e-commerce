import Slider from '../components/Slider'
import ProductCard from '../components/ProductCard'
import PostCard from '../components/PostCard'
import { heroSlides, greenSlides, editorsPick, products, neuralImage, posts } from '../data/homeData'

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. hero slider */}
      <Slider
        slides={heroSlides}
        className="bg-gradient-to-r from-primary to-cyan-300"
        renderSlide={(slide) => (
          <div className="flex flex-col lg:flex-row items-center w-full px-8 lg:px-48 pt-28 lg:pt-0 min-h-[700px]">
            <div className="flex flex-col items-center lg:items-start gap-8 text-white text-center lg:text-left lg:w-1/2">
              <h5 className="font-bold">{slide.season}</h5>
              <h1 className="text-4xl lg:text-6xl font-bold">{slide.title}</h1>
              <p className="text-xl max-w-sm">{slide.text}</p>
              <button className="bg-success text-2xl font-bold px-10 py-4 rounded">SHOP NOW</button>
            </div>
            <img src={slide.image} alt="" className="w-full lg:w-1/2 max-w-xl mt-10 lg:mt-auto self-end" />
          </div>
        )}
      />

      {/* 2. editor's pick */}
      <section className="flex flex-col items-center bg-light px-8 py-20">
        <h3 className="text-2xl font-bold text-dark">EDITOR'S PICK</h3>
        <p className="text-sm text-second text-center mt-2 mb-12">Problems trying to resolve the conflict between</p>

        <div className="flex flex-col lg:flex-row gap-7 w-full lg:w-auto">
          <div className="relative">
            <img src={editorsPick.men} alt="men" className="w-full lg:w-[510px] h-[500px] object-cover" />
            <span className="absolute bottom-6 left-6 bg-white text-dark font-bold px-12 py-3">MEN</span>
          </div>
          <div className="relative">
            <img src={editorsPick.women} alt="women" className="w-full lg:w-60 h-[500px] object-cover" />
            <span className="absolute bottom-6 left-6 bg-white text-dark font-bold px-8 py-3">WOMEN</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <img src={editorsPick.accessories} alt="accessories" className="w-full lg:w-60 h-60 object-cover" />
              <span className="absolute bottom-5 left-5 bg-white text-dark font-bold px-5 py-3">ACCESSORIES</span>
            </div>
            <div className="relative">
              <img src={editorsPick.kids} alt="kids" className="w-full lg:w-60 h-60 object-cover" />
              <span className="absolute bottom-5 left-5 bg-white text-dark font-bold px-8 py-3">KIDS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. bestseller ürünler */}
      <section className="flex flex-col items-center px-8 py-20">
        <h4 className="text-xl text-second">Featured Products</h4>
        <h3 className="text-2xl font-bold text-dark text-center mt-2">BESTSELLER PRODUCTS</h3>
        <p className="text-sm text-second text-center mt-2 mb-16">Problems trying to resolve the conflict between</p>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. yeşil slider */}
      <Slider
        slides={greenSlides}
        className="bg-green-dark"
        renderSlide={(slide) => (
          <div className="flex flex-col lg:flex-row items-center w-full px-8 lg:px-48 pt-28 lg:pt-0 min-h-[700px]">
            <div className="flex flex-col items-center lg:items-start gap-8 text-white text-center lg:text-left lg:w-1/2">
              <h5 className="text-xl">{slide.season}</h5>
              <h2 className="text-4xl lg:text-6xl font-bold">{slide.title}</h2>
              <p className="text-sm max-w-sm">{slide.text}</p>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <span className="text-2xl font-bold">{slide.price}</span>
                <button className="bg-success text-sm font-bold px-10 py-4 rounded">ADD TO CART</button>
              </div>
            </div>
            <img src={slide.image} alt="" className="w-full lg:w-1/2 max-w-lg mt-10 lg:mt-auto self-end" />
          </div>
        )}
      />

      {/* 5. neural universe */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 px-8 lg:px-48 py-20">
        <img src={neuralImage} alt="" className="w-full lg:w-1/2 max-w-xl" />
        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
          <h5 className="font-bold text-muted">SUMMER 2025</h5>
          <h2 className="text-4xl font-bold text-dark max-w-sm">Part of the Neural Universe</h2>
          <p className="text-xl text-second max-w-sm">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-col lg:flex-row gap-3">
            <button className="bg-success text-white text-sm font-bold px-10 py-4 rounded">BUY NOW</button>
            <button className="border border-success text-success text-sm font-bold px-10 py-4 rounded">READ MORE</button>
          </div>
        </div>
      </section>

      {/* 6. featured posts */}
      <section className="flex flex-col items-center px-8 py-20">
        <h6 className="text-sm font-bold text-primary">Practice Advice</h6>
        <h2 className="text-4xl font-bold text-dark mt-2">Featured Posts</h2>
        <div className="flex flex-col lg:flex-row gap-8 mt-20">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
