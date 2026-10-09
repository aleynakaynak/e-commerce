import { pageImages } from '../data/homeData'
import TeamCard from '../components/TeamCard'
import { team } from '../data/teamData'

const stats = [
  { value: '15K', label: 'Happy Customers' },
  { value: '150K', label: 'Monthly Visitors' },
  { value: '15', label: 'Countries Worldwide' },
  { value: '100+', label: 'Top Partners' },
]

function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col lg:flex-row items-center gap-12 px-8 lg:px-48 py-20">
        <div className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left lg:w-1/2">
          <h5 className="font-bold text-dark">ABOUT COMPANY</h5>
          <h1 className="text-4xl lg:text-6xl font-bold text-dark">ABOUT US</h1>
          <p className="text-xl text-second max-w-sm">
            We know how large objects will act, but things on a small scale
          </p>
          <button className="bg-primary text-white text-sm font-bold px-10 py-4 rounded">Get Quote Now</button>
        </div>
        <img src={pageImages.about} alt="" className="w-full lg:w-1/2 max-w-md h-[500px] object-cover rounded-3xl" />
      </section>

      <section className="flex flex-col lg:flex-row gap-8 px-8 lg:px-48 py-8 text-center lg:text-left">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <span className="text-sm text-danger">Problems trying</span>
          <h3 className="text-2xl font-bold text-dark">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h3>
        </div>
        <p className="text-sm text-second lg:w-1/2">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian
          mechanics
        </p>
      </section>

      {/* rakamlar */}
      <section className="flex flex-col lg:flex-row justify-center gap-16 lg:gap-24 px-8 py-20">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <h1 className="text-6xl font-bold text-dark">{stat.value}</h1>
            <h5 className="font-bold text-second">{stat.label}</h5>
          </div>
        ))}
      </section>

      <section className="flex justify-center px-8 pb-20">
        <img src={pageImages.video} alt="" className="w-full max-w-5xl h-[540px] object-cover rounded-2xl" />
      </section>

      <section className="flex flex-col items-center gap-12 px-8 py-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-4xl font-bold text-dark">Meet Our Team</h2>
          <p className="text-sm text-second max-w-md">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian
            mechanics
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* çalışma çağrısı */}
      <section className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center lg:items-start gap-6 bg-primary text-white text-center lg:text-left px-8 lg:px-48 py-24 lg:w-3/5">
          <h5 className="font-bold">WORK WITH US</h5>
          <h2 className="text-4xl font-bold">Now Let's grow Yours</h2>
          <p className="text-sm max-w-md">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter
            of the 20th
          </p>
          <button className="border border-white text-sm font-bold px-10 py-4 rounded">Button</button>
        </div>
        <img src={pageImages.work} alt="" className="hidden lg:block lg:w-2/5 object-cover" />
      </section>
    </div>
  )
}

export default AboutPage
