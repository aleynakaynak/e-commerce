import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import api from '../api/axiosInstance'
import { fetchCards } from '../store/actions/clientActions'
import { calcTotals } from '../utils/cartTotals'

const inputClass = 'border border-gray-300 bg-light rounded px-4 py-3 text-sm font-normal'
const INSTALLMENTS = [1, 3, 6]

// sipariş 2. adım: kart seçimi, yeni kart ve taksit seçenekleri
function CardStep({ cardId, setCardId, ccv, setCcv, installment, setInstallment }) {
  const dispatch = useDispatch()
  const creditCards = useSelector((state) => state.client.creditCards)
  const cart = useSelector((state) => state.shoppingCart.cart)
  const { grandTotal } = calcTotals(cart)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  const openNewForm = () => {
    setEditingId(null)
    reset({ card_no: '', name_on_card: '', expire_month: '', expire_year: '' })
    setFormOpen(true)
  }

  const openEditForm = (card) => {
    setEditingId(card.id)
    reset(card)
    setFormOpen(true)
  }

  const onSubmit = (data) => {
    const payload = {
      card_no: data.card_no,
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
      name_on_card: data.name_on_card,
    }

    const request = editingId
      ? api.put('/user/card', { id: editingId, ...payload })
      : api.post('/user/card', payload)

    request
      .then(() => {
        toast.success('Kart kaydedildi')
        setFormOpen(false)
        dispatch(fetchCards())
      })
      .catch(() => toast.error('Kart kaydedilemedi'))
  }

  const handleDelete = (id) => {
    api
      .delete('/user/card/' + id)
      .then(() => {
        if (cardId === id) setCardId(null)
        dispatch(fetchCards())
      })
      .catch(() => toast.error('Kart silinemedi'))
  }

  const currentYear = new Date().getFullYear()
  const years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => currentYear + i)

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-xl font-bold text-dark">Kart Bilgileri</h4>

      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
        <button
          type="button"
          onClick={openNewForm}
          className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-400 rounded p-6 lg:w-72 text-sm font-bold text-second"
        >
          <Plus size={20} /> Yeni Kart Ekle
        </button>

        {creditCards.map((card) => (
          <label
            key={card.id}
            className={`flex flex-col gap-2 border rounded p-4 lg:w-72 text-sm cursor-pointer ${cardId === card.id ? 'border-primary bg-light' : 'border-gray-300'}`}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold text-dark">
                <input type="radio" name="card" checked={cardId === card.id} onChange={() => setCardId(card.id)} />
                {card.name_on_card}
              </span>
              <span className="flex gap-3 text-second">
                <button type="button" onClick={() => openEditForm(card)}><Pencil size={15} /></button>
                <button type="button" onClick={() => handleDelete(card.id)}><Trash2 size={15} /></button>
              </span>
            </div>
            {/* kart numarasının sadece son 4 hanesi gösteriliyor */}
            <span className="font-bold">**** **** **** {String(card.card_no).slice(-4)}</span>
            <span className="text-second">{card.expire_month}/{card.expire_year}</span>
          </label>
        ))}
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border border-gray-300 rounded p-5">
          <h5 className="font-bold text-dark">{editingId ? 'Kartı Düzenle' : 'Yeni Kart'}</h5>

          <label className="flex flex-col gap-1 text-sm font-bold text-dark">
            Kart Numarası
            <input
              maxLength={16}
              className={inputClass}
              {...register('card_no', {
                required: 'Kart numarası zorunlu',
                pattern: { value: /^\d{16}$/, message: '16 haneli olmalı' },
              })}
            />
            {errors.card_no && <span className="text-xs text-danger">{errors.card_no.message}</span>}
          </label>

          <label className="flex flex-col gap-1 text-sm font-bold text-dark">
            Kart Üzerindeki İsim
            <input className={inputClass} {...register('name_on_card', { required: 'İsim zorunlu' })} />
            {errors.name_on_card && <span className="text-xs text-danger">{errors.name_on_card.message}</span>}
          </label>

          <div className="flex gap-4">
            <label className="flex flex-col flex-1 gap-1 text-sm font-bold text-dark">
              Ay
              <select className={inputClass} {...register('expire_month', { required: 'Ay seç' })}>
                <option value="">Ay</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.expire_month && <span className="text-xs text-danger">{errors.expire_month.message}</span>}
            </label>
            <label className="flex flex-col flex-1 gap-1 text-sm font-bold text-dark">
              Yıl
              <select className={inputClass} {...register('expire_year', { required: 'Yıl seç' })}>
                <option value="">Yıl</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.expire_year && <span className="text-xs text-danger">{errors.expire_year.message}</span>}
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded">Kaydet</button>
            <button type="button" onClick={() => setFormOpen(false)} className="border border-gray-300 text-sm font-bold px-6 py-3 rounded">
              Vazgeç
            </button>
          </div>
        </form>
      )}

      {/* seçili kart için güvenlik kodu ve taksit */}
      {cardId && (
        <div className="flex flex-col lg:flex-row gap-8">
          <label className="flex flex-col gap-1 text-sm font-bold text-dark">
            Güvenlik Kodu (CCV)
            <input
              type="password"
              maxLength={3}
              value={ccv}
              onChange={(e) => setCcv(e.target.value.replace(/\D/g, ''))}
              className={inputClass + ' w-32'}
            />
          </label>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-bold text-dark">Taksit Seçenekleri</span>
            {INSTALLMENTS.map((count) => (
              <label key={count} className="flex items-center gap-2 text-second">
                <input type="radio" name="installment" checked={installment === count} onChange={() => setInstallment(count)} />
                {count === 1 ? 'Tek Çekim' : count + ' Taksit'} · {(grandTotal / count).toFixed(2)} ₺{count > 1 ? ' x ' + count : ''}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardStep
