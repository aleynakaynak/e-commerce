import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import TeamCard from '../components/TeamCard'
import { team } from '../data/teamData'
import { pageImages } from '../data/homeData'

function TeamPage() {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center gap-4 px-8 py-12 text-center">
        <h5 className="font-bold text-second">WHAT WE DO</h5>
        <h1 className="text-4xl lg:text-6xl font-bold text-dark">Innovation tailored for you</h1>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link to="/" className="text-dark">Home</Link>
          <ChevronRight size={16} className="text-muted" />
          <span className="text-second">Team</span>
        </div>
      </section>

      {/* görsel şeridi */}
      <section className="flex flex-col lg:flex-row gap-3">
        <img src={pageImages.teamBig} alt="" className="w-full lg:w-1/2 h-[530px] object-cover" />
        <div className="flex flex-wrap gap-3 lg:w-1/2">
          {pageImages.teamSmall.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="w-[calc(50%-6px)] h-[259px] object-cover"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-12 px-8 py-20">
        <h2 className="text-4xl font-bold text-dark">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-dark">Start your 14 days free trial</h2>
        <p className="text-sm text-second max-w-md">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
        </p>
        <button className="bg-primary text-white text-sm font-bold px-10 py-4 rounded">Try it free now</button>
      </section>
    </div>
  )
}

export default TeamPage
