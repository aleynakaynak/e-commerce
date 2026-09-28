import { InstagramIcon, FacebookIcon, TwitterIcon } from '../components/SocialIcons'

const footerLinks = [
  { title: 'Company Info', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Legal', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Features', links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'] },
  { title: 'Resources', links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API'] },
]

function Footer() {
  return (
    <footer className="flex flex-col">
      {/* logo + sosyal medya */}
      <div className="bg-light">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 px-8 lg:px-48 py-10 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-dark">Bandage</h3>
          <div className="flex gap-5 text-primary">
            <FacebookIcon size={24} />
            <InstagramIcon size={24} />
            <TwitterIcon size={24} />
          </div>
        </div>
      </div>

      {/* link kolonları */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-8 lg:px-48 py-12">
        {footerLinks.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h5 className="font-bold text-dark">{col.title}</h5>
            {col.links.map((link, i) => (
              <a key={i} href="#" className="text-sm font-bold text-second">{link}</a>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-dark">Get In Touch</h5>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-200 bg-light rounded-l px-4 py-3 text-sm w-full lg:w-52"
            />
            <button className="bg-primary text-white text-sm px-5 rounded-r">Subscribe</button>
          </div>
          <p className="text-xs text-second">Lore imp sum dolor Amit</p>
        </div>
      </div>

      <div className="bg-light px-8 lg:px-48 py-6">
        <p className="text-sm font-bold text-second text-center lg:text-left">
          Made With Love By Finland All Right Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
