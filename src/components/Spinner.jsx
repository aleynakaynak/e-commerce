function Spinner({ size = 'w-10 h-10' }) {
  return (
    <span className={`${size} border-4 border-primary border-t-transparent rounded-full animate-spin`}></span>
  )
}

export default Spinner
