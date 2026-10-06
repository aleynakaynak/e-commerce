import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Phone, Mail, User, Search, ShoppingCart, Heart, Menu, ChevronDown } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, FacebookIcon, TwitterIcon } from '../components/SocialIcons'
import CartDropdown from '../components/CartDropdown'
import { fetchCategories, setOffset } from '../store/actions/productActions'
import { logoutUser } from '../store/actions/clientActions'
import { getCategoryPath, getGravatarUrl } from '../utils/helpers'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [avatar, setAvatar] = useState('')

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.product.categories)
  const user = useSelector((state) => state.client.user)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // kullanıcı giriş yapınca gravatar resmini al
  useEffect(() => {
    if (user.email) {
      getGravatarUrl(user.email).then((url) => setAvatar(url))
    }
  }, [user.email])

  // kategori seçilince menüyü kapat ve ilk sayfaya dön
  const handleCategoryClick = () => {
    setShopOpen(false)
    dispatch(setOffset(0))
  }

  const womenCategories = categories.filter((c) => c.gender === 'k')
  const menCategories = categories.filter((c) => c.gender === 'e')

  return (
    <header className="flex flex-col">
      {/* üst koyu bar - sadece masaüstünde */}
      <div className="hidden lg:flex bg-dark text-white text-sm font-bold justify-between items-center px-6 py-3">
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><Phone size={16} /> (225) 555-0118</span>
          <span className="flex items-center gap-1"><Mail size={16} /> michelle.rivera@example.com</span>
        </div>
        <p>Follow Us and get a chance to win 80% off</p>
        <div className="flex items-center gap-3">
          <span>Follow Us :</span>
          <InstagramIcon />
          <YoutubeIcon />
          <FacebookIcon />
          <TwitterIcon />
        </div>
      </div>

      {/* navbar */}
      <nav className="flex flex-col lg:flex-row lg:items-center px-6 lg:px-10 py-5">
        <div className="flex justify-between items-center lg:mr-24">
          <Link to="/" className="text-2xl font-bold text-dark">Bandage</Link>

          {/* mobil ikonlar */}
          <div className="flex items-center gap-5 text-dark lg:hidden">
            <Link to="/login"><User size={22} /></Link>
            <Search size={22} />
            <Link to="/cart"><ShoppingCart size={22} /></Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* linkler: mobilde menü açılınca görünüyor */}
        <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-8 lg:gap-4 text-3xl lg:text-sm text-second font-bold py-16 lg:py-0`}>
          <Link to="/">Home</Link>

          {/* shop + kategori dropdown */}
          <div className="relative flex items-center gap-1">
            <Link to="/shop" className="text-dark lg:font-medium">Shop</Link>
            <button onClick={() => setShopOpen(!shopOpen)} className="hidden lg:block">
              <ChevronDown size={16} />
            </button>

            {shopOpen && (
              <div className="absolute top-8 left-0 z-20 hidden lg:flex gap-12 bg-white shadow-lg rounded p-6">
                <div className="flex flex-col gap-3">
                  <h6 className="text-dark">Kadın</h6>
                  {womenCategories.map((c) => (
                    <Link key={c.id} to={getCategoryPath(c)} onClick={handleCategoryClick}>{c.title}</Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <h6 className="text-dark">Erkek</h6>
                  {menCategories.map((c) => (
                    <Link key={c.id} to={getCategoryPath(c)} onClick={handleCategoryClick}>{c.title}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/about">About</Link>
          <Link to="/blog" className="hidden lg:block">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/team">Team</Link>
        </div>

        {/* masaüstü sağ taraf */}
        <div className="hidden lg:flex items-center gap-6 ml-auto text-primary text-sm font-bold">
          {user.email ? (
            <div className="relative flex items-center gap-2">
              {avatar && <img src={avatar} alt="" className="w-8 h-8 rounded-full" />}
              <button onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-1">
                {user.name} <ChevronDown size={14} />
              </button>
              {userOpen && (
                <div className="absolute top-10 right-0 z-20 flex flex-col gap-3 bg-white shadow-lg rounded p-4 w-40 text-second">
                  <Link to="/orders" onClick={() => setUserOpen(false)}>Siparişlerim</Link>
                  <button onClick={() => dispatch(logoutUser())} className="text-left">Çıkış</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <User size={16} />
              <Link to="/login">Login</Link> / <Link to="/signup">Register</Link>
            </div>
          )}
          <Search size={18} />
          <CartDropdown />
          <span className="flex items-center gap-1"><Heart size={18} /> 1</span>
        </div>
      </nav>
    </header>
  )
}

export default Header
