import { InstagramIcon, FacebookIcon, TwitterIcon } from './SocialIcons'

function TeamCard({ member }) {
  return (
    <div className="flex flex-col items-center w-full sm:w-72">
      <img src={member.image} alt={member.name} className="w-full h-60 object-cover" />
      <div className="flex flex-col items-center gap-2 p-6">
        <h5 className="font-bold text-dark">{member.name}</h5>
        <h6 className="text-sm font-bold text-second">{member.role}</h6>
        <div className="flex gap-4 text-primary">
          <FacebookIcon size={20} />
          <InstagramIcon size={20} />
          <TwitterIcon size={20} />
        </div>
      </div>
    </div>
  )
}

export default TeamCard
