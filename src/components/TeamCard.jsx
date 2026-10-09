import { InstagramIcon, FacebookIcon, TwitterIcon } from './SocialIcons'

// fotoğraf yerine isim baş harfleri
function TeamCard({ member }) {
  const initials = member.name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className="flex flex-col items-center w-full sm:w-72">
      <div className="flex items-center justify-center w-full h-60 bg-light text-6xl font-bold text-primary">
        {initials}
      </div>
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
