import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// basit slider: slides dizisini alıyor, her slide'ı renderSlide ile çiziyor
function Slider({ slides, renderSlide, className = '' }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(current === 0 ? slides.length - 1 : current - 1)
  const next = () => setCurrent(current === slides.length - 1 ? 0 : current + 1)

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      {renderSlide(slides[current])}

      <button onClick={prev} className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 text-white">
        <ChevronLeft size={44} />
      </button>
      <button onClick={next} className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 text-white">
        <ChevronRight size={44} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`w-16 h-2 ${i === current ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
