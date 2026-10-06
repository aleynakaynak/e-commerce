import { useSelector } from 'react-redux'
import { calcTotals } from '../utils/cartTotals'

// sepet ve sipariş sayfasında sağda duran özet kutusu
function OrderSummary({ children }) {
  const cart = useSelector((state) => state.shoppingCart.cart)
  const { productsTotal, shipping, discount, grandTotal } = calcTotals(cart)

  return (
    <div className="flex flex-col gap-4 lg:w-80">
      <div className="flex flex-col gap-3 border border-gray-200 rounded p-5 text-sm">
        <h4 className="text-xl font-bold text-dark">Sipariş Özeti</h4>
        <div className="flex justify-between">
          <span className="text-second">Ürünün Toplamı</span>
          <span className="font-bold">{productsTotal.toFixed(2)} ₺</span>
        </div>
        <div className="flex justify-between">
          <span className="text-second">Kargo Toplam</span>
          <span className="font-bold">{shipping} ₺</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-second">150 ₺ ve Üzeri Kargo Bedava</span>
          <span className="font-bold text-danger">-{discount.toFixed(2)} ₺</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3">
          <span className="font-bold">Toplam</span>
          <span className="font-bold text-primary">{grandTotal.toFixed(2)} ₺</span>
        </div>
      </div>
      {children}
    </div>
  )
}

export default OrderSummary
