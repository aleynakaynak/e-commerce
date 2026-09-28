import { AlarmClock, ChartArea, ChevronRight } from 'lucide-react'

function PostCard({ post }) {
  return (
    <div className="flex flex-col bg-white shadow-md w-full lg:w-88">
      <div className="relative">
        <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
        <span className="absolute top-5 left-5 bg-danger text-white text-sm font-bold px-3 py-1 rounded">NEW</span>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex gap-4 text-xs">
          <span className="text-primary">Google</span>
          <span className="text-second">Trending</span>
          <span className="text-second">New</span>
        </div>
        <h4 className="text-xl text-dark">{post.title}</h4>
        <p className="text-sm text-second">{post.text}</p>
        <div className="flex justify-between text-xs text-second py-3">
          <span className="flex items-center gap-1">
            <AlarmClock size={16} className="text-primary" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <ChartArea size={16} className="text-green-dark" /> {post.comments} comments
          </span>
        </div>
        <a href="#" className="flex items-center gap-2 text-sm font-bold text-second">
          Learn More <ChevronRight size={18} className="text-primary" />
        </a>
      </div>
    </div>
  )
}

export default PostCard
