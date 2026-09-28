import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, User, Search, ShoppingCart, Heart, Menu, ChevronDown } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, FacebookIcon, TwitterIcon } from '../components/SocialIcons'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            <User size={22} />
            <Search size={22} />
            <ShoppingCart size={22} />
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* linkler: mobilde menü açılınca görünüyor */}
        <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-8 lg:gap-4 text-3xl lg:text-sm text-second font-bold py-16 lg:py-0`}>
          <Link to="/">Home</Link>
          <Link to="/shop" className="flex items-center gap-1 text-dark lg:font-medium">
            Shop <ChevronDown size={16} className="hidden lg:block" />
          </Link>
          <Link to="/about">About</Link>
          <Link to="/blog" className="hidden lg:block">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/pages" className="hidden lg:block">Pages</Link>
        </div>

        {/* masaüstü sağ taraf */}
        <div className="hidden lg:flex items-center gap-6 ml-auto text-primary text-sm font-bold">
          <Link to="/login" className="flex items-center gap-1">
            <User size={16} /> Login / Register
          </Link>
          <Search size={18} />
          <span className="flex items-center gap-1"><ShoppingCart size={18} /> 1</span>
          <span className="flex items-center gap-1"><Heart size={18} /> 1</span>
        </div>
      </nav>
    </header>
  )
}

export default Header
