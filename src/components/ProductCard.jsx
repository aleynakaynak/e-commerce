function ProductCard({ product }) {
  return (
    <div className="flex flex-col items-center bg-white w-full sm:w-60">
      <img src={product.image} alt={product.title} className="w-full h-80 object-cover" />
      <div className="flex flex-col items-center gap-2 py-6">
        <h5 className="font-bold text-dark">{product.title}</h5>
        <p className="text-sm font-bold text-second">{product.department}</p>
        <div className="flex gap-2 font-bold">
          <span className="text-muted">{product.oldPrice}</span>
          <span className="text-green-dark">{product.price}</span>
        </div>
        <div className="flex gap-1">
          <span className="w-4 h-4 rounded-full bg-primary"></span>
          <span className="w-4 h-4 rounded-full bg-green-dark"></span>
          <span className="w-4 h-4 rounded-full bg-orange-500"></span>
          <span className="w-4 h-4 rounded-full bg-dark"></span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
