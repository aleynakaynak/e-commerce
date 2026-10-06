import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { CircleCheck } from 'lucide-react'
import api from '../api/axiosInstance'
import AddressStep from '../components/AddressStep'
import CardStep from '../components/CardStep'
import OrderSummary from '../components/OrderSummary'
import Spinner from '../components/Spinner'
import { setCart, setAddress, setPayment } from '../store/actions/shoppingCartActions'
import { calcTotals } from '../utils/cartTotals'

function OrderPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)
  const addressList = useSelector((state) => state.client.addressList)
  const creditCards = useSelector((state) => state.client.creditCards)

  const [step, setStep] = useState(1)
  const [shippingId, setShippingId] = useState(null)
  const [billingId, setBillingId] = useState(null)
  const [cardId, setCardId] = useState(null)
  const [ccv, setCcv] = useState('')
  const [installment, setInstallment] = useState(1)
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const selectedItems = cart.filter((item) => item.checked)
  const { grandTotal } = calcTotals(cart)

  const goToPayment = () => {
    if (!shippingId) {
      toast.error('Önce bir teslimat adresi seç')
      return
    }
    // seçilen adresi sepet reducer'ına kaydet
    dispatch(setAddress(addressList.find((a) => a.id === shippingId)))
    setStep(2)
  }

  const completeOrder = () => {
    const card = creditCards.find((c) => c.id === cardId)
    if (!card) {
      toast.error('Bir kart seç')
      return
    }
    if (ccv.length !== 3) {
      toast.error('Güvenlik kodunu gir')
      return
    }

    dispatch(setPayment({ cardId, installment }))

    const payload = {
      address_id: shippingId,
      order_date: new Date().toISOString().slice(0, 19),
      card_no: Number(card.card_no),
      card_name: card.name_on_card,
      card_expire_month: card.expire_month,
      card_expire_year: card.expire_year,
      card_ccv: Number(ccv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.name,
      })),
    }

    setLoading(true)
    api
      .post('/order', payload)
      .then(() => {
        // sipariş verilen ürünleri sepetten çıkar, ekranı sıfırla
        dispatch(setCart(cart.filter((item) => !item.checked)))
        dispatch(setPayment({}))
        dispatch(setAddress({}))
        setCompleted(true)
      })
      .catch(() => toast.error('Sipariş oluşturulamadı'))
      .finally(() => setLoading(false))
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <CircleCheck size={64} className="text-success" />
        <h3 className="text-2xl font-bold text-dark">Tebrikler, siparişin alındı!</h3>
        <p className="text-second">Siparişini "Siparişlerim" sayfasından takip edebilirsin.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/orders" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded">Siparişlerim</Link>
          <Link to="/shop" className="border border-primary text-primary text-sm font-bold px-6 py-3 rounded">Alışverişe devam et</Link>
        </div>
      </div>
    )
  }

  if (selectedItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24">
        <p className="text-second">Sipariş için sepette seçili ürün yok.</p>
        <Link to="/cart" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded">Sepete dön</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-48 py-12">
      <div className="flex flex-col flex-1 gap-8">
        {/* adım başlıkları */}
        <div className="flex border border-gray-300 rounded text-sm font-bold">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 px-4 py-4 text-left ${step === 1 ? 'border-b-4 border-primary text-primary' : 'text-second'}`}
          >
            1. Adres Bilgileri
          </button>
          <button
            onClick={goToPayment}
            className={`flex-1 px-4 py-4 text-left ${step === 2 ? 'border-b-4 border-primary text-primary' : 'text-second'}`}
          >
            2. Ödeme Seçenekleri
          </button>
        </div>

        {step === 1 && (
          <AddressStep
            shippingId={shippingId}
            setShippingId={setShippingId}
            billingId={billingId}
            setBillingId={setBillingId}
          />
        )}

        {step === 2 && (
          <CardStep
            cardId={cardId}
            setCardId={setCardId}
            ccv={ccv}
            setCcv={setCcv}
            installment={installment}
            setInstallment={setInstallment}
          />
        )}
      </div>

      <OrderSummary>
        {step === 1 ? (
          <button onClick={goToPayment} className="bg-primary text-white font-bold py-3 rounded">
            Kaydet ve Devam Et
          </button>
        ) : (
          <button
            onClick={completeOrder}
            disabled={loading}
            className="flex justify-center items-center gap-2 bg-primary text-white font-bold py-3 rounded disabled:opacity-60"
          >
            {loading && <Spinner size="w-4 h-4" />}
            Siparişi Tamamla
          </button>
        )}
      </OrderSummary>
    </div>
  )
}

export default OrderPage
