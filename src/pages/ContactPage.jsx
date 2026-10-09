import { pageImages } from '../data/homeData'
import { Phone, MapPin, Send } from 'lucide-react'
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../components/SocialIcons'

const offices = [
  { icon: Phone, lines: ['georgia.young@example.com', 'georgia.young@ple.com'] },
  { icon: MapPin, lines: ['georgia.young@example.com', 'georgia.young@ple.com'] },
  { icon: Send, lines: ['georgia.young@example.com', 'georgia.young@ple.com'] },
]

function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* üst bölüm */}
      <section className="flex flex-col lg:flex-row items-center gap-12 px-8 lg:px-48 py-20">
        <div className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left lg:w-1/2">
          <h5 className="font-bold text-dark">CONTACT US</h5>
          <h1 className="text-4xl lg:text-6xl font-bold text-dark">Get in touch today!</h1>
          <p className="text-xl text-second max-w-sm">
            We know how large objects will act, but things on a small scale
          </p>
          <div className="flex flex-col gap-2 text-2xl font-bold text-dark">
            <span>Phone : +451 215 215</span>
            <span>Fax : +451 215 215</span>
          </div>
          <div className="flex gap-6 text-dark">
            <TwitterIcon size={28} />
            <FacebookIcon size={28} />
            <InstagramIcon size={28} />
          </div>
        </div>
        <img
          src={pageImages.contact}
          alt=""
          className="w-full lg:w-1/2 max-w-md h-[500px] object-cover rounded-3xl"
        />
      </section>

      {/* ofis kartları */}
      <section className="flex flex-col items-center gap-12 bg-light px-8 py-20">
        <div className="flex flex-col items-center gap-2 text-center">
          <h6 className="text-sm font-bold text-dark">VISIT OUR OFFICE</h6>
          <h2 className="text-4xl font-bold text-dark max-w-xl">We help small businesses with big ideas</h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          {offices.map((office, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-4 px-10 py-12 ${i === 1 ? 'bg-dark text-white' : 'bg-white text-dark'}`}
            >
              <office.icon size={56} className="text-primary" />
              {office.lines.map((line) => (
                <span key={line} className="text-sm font-bold">{line}</span>
              ))}
              <span className="font-bold mt-2">Get Support</span>
              <button className="border border-primary text-primary text-sm font-bold px-5 py-3 rounded-full">
                Submit Request
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-8 py-20 text-center">
        <h5 className="font-bold text-dark">WE Can't WAIT TO MEET YOU</h5>
        <h1 className="text-4xl lg:text-6xl font-bold text-dark">Let's Talk</h1>
        <button className="bg-primary text-white text-sm font-bold px-10 py-4 rounded">Try it free now</button>
      </section>
    </div>
  )
}

export default ContactPage
