import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import api from '../api/axiosInstance'
import { fetchAddresses } from '../store/actions/clientActions'
import { cities } from '../data/cities'

const inputClass = 'border border-gray-300 bg-light rounded px-4 py-3 text-sm font-normal'

// sipariş 1. adım: teslimat ve fatura adresi seçimi
function AddressStep({ shippingId, setShippingId, billingId, setBillingId }) {
  const dispatch = useDispatch()
  const addressList = useSelector((state) => state.client.addressList)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [sameAddress, setSameAddress] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    dispatch(fetchAddresses())
  }, [dispatch])

  const openNewForm = () => {
    setEditingId(null)
    reset({ title: '', name: '', surname: '', phone: '', city: '', district: '', neighborhood: '' })
    setFormOpen(true)
  }

  const openEditForm = (address) => {
    setEditingId(address.id)
    reset(address)
    setFormOpen(true)
  }

  const onSubmit = (data) => {
    // backend sadece bu alanları kabul ediyor
    const payload = {
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood,
    }

    // güncelleme için PUT, yeni adres için POST
    const request = editingId
      ? api.put('/user/address', { id: editingId, ...payload })
      : api.post('/user/address', payload)

    request
      .then(() => {
        toast.success('Adres kaydedildi')
        setFormOpen(false)
        dispatch(fetchAddresses())
      })
      .catch(() => toast.error('Adres kaydedilemedi'))
  }

  const handleDelete = (id) => {
    api
      .delete('/user/address/' + id)
      .then(() => {
        if (shippingId === id) setShippingId(null)
        if (billingId === id) setBillingId(null)
        dispatch(fetchAddresses())
      })
      .catch(() => toast.error('Adres silinemedi'))
  }

  const handleSameAddress = () => {
    setSameAddress(!sameAddress)
    setBillingId(null)
  }

  // adres kartları (teslimat ve fatura için aynı liste kullanılıyor)
  const renderList = (selectedId, onSelect, groupName) => (
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
      <button
        type="button"
        onClick={openNewForm}
        className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-400 rounded p-6 lg:w-72 text-sm font-bold text-second"
      >
        <Plus size={20} /> Yeni Adres Ekle
      </button>

      {addressList.map((address) => (
        <label
          key={address.id}
          className={`flex flex-col gap-2 border rounded p-4 lg:w-72 text-sm cursor-pointer ${selectedId === address.id ? 'border-primary bg-light' : 'border-gray-300'}`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold text-dark">
              <input
                type="radio"
                name={groupName}
                checked={selectedId === address.id}
                onChange={() => onSelect(address.id)}
              />
              {address.title}
            </span>
            <span className="flex gap-3 text-second">
              <button type="button" onClick={() => openEditForm(address)}><Pencil size={15} /></button>
              <button type="button" onClick={() => handleDelete(address.id)}><Trash2 size={15} /></button>
            </span>
          </div>
          <span className="font-bold">{address.name} {address.surname} · {address.phone}</span>
          <span className="text-second">{address.neighborhood}</span>
          <span className="text-second">{address.district} / {address.city}</span>
        </label>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-dark">Teslimat Adresi</h4>
        <label className="flex items-center gap-2 text-sm text-second">
          <input type="checkbox" checked={sameAddress} onChange={handleSameAddress} />
          Faturamı aynı adrese gönder
        </label>
      </div>
      {renderList(shippingId, setShippingId, 'shipping')}

      {!sameAddress && (
        <div className="flex flex-col gap-6">
          <h4 className="text-xl font-bold text-dark">Fatura Adresi</h4>
          {renderList(billingId, setBillingId, 'billing')}
        </div>
      )}

      {formOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border border-gray-300 rounded p-5">
          <h5 className="font-bold text-dark">{editingId ? 'Adresi Düzenle' : 'Yeni Adres'}</h5>

          <label className="flex flex-col gap-1 text-sm font-bold text-dark">
            Adres Başlığı
            <input className={inputClass} {...register('title', { required: 'Adres başlığı zorunlu' })} />
            {errors.title && <span className="text-xs text-danger">{errors.title.message}</span>}
          </label>

          <div className="flex flex-col lg:flex-row gap-4">
            <label className="flex flex-col flex-1 gap-1 text-sm font-bold text-dark">
              Ad
              <input className={inputClass} {...register('name', { required: 'Ad zorunlu' })} />
              {errors.name && <span className="text-xs text-danger">{errors.name.message}</span>}
            </label>
            <label className="flex flex-col flex-1 gap-1 text-sm font-bold text-dark">
              Soyad
              <input className={inputClass} {...register('surname', { required: 'Soyad zorunlu' })} />
              {errors.surname && <span className="text-xs text-danger">{errors.surname.message}</span>}
            </label>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <label className="flex flex-col flex-1 gap-1 text-sm font-bold text-dark">
              Telefon
              <input
                placeholder="05XXXXXXXXX"
                className={inputClass}
                {...register('phone', {
                  required: 'Telefon zorunlu',
                  pattern: { value: /^(\+90|0)?5\d{9}$/, message: 'Geçerli bir telefon numarası gir' },
                })}
              />
              {errors.phone && <span className="text-xs text-danger">{errors.phone.message}</span>}
            </label>
            <label className="flex flex-col flex-1 gap-1 text-sm font-bold text-dark">
              İl
              <select className={inputClass} {...register('city', { required: 'İl seç' })}>
                <option value="">İl seç</option>
                {cities.map((city) => (
                  <option key={city} value={city.toLocaleLowerCase('tr')}>{city}</option>
                ))}
              </select>
              {errors.city && <span className="text-xs text-danger">{errors.city.message}</span>}
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-bold text-dark">
            İlçe
            <input className={inputClass} {...register('district', { required: 'İlçe zorunlu' })} />
            {errors.district && <span className="text-xs text-danger">{errors.district.message}</span>}
          </label>

          <label className="flex flex-col gap-1 text-sm font-bold text-dark">
            Mahalle ve adres detayı
            <textarea
              rows={3}
              placeholder="Mahalle, sokak, bina ve kapı numarası"
              className={inputClass}
              {...register('neighborhood', { required: 'Adres detayı zorunlu' })}
            />
            {errors.neighborhood && <span className="text-xs text-danger">{errors.neighborhood.message}</span>}
          </label>

          <div className="flex gap-3">
            <button type="submit" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded">Kaydet</button>
            <button type="button" onClick={() => setFormOpen(false)} className="border border-gray-300 text-sm font-bold px-6 py-3 rounded">
              Vazgeç
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddressStep
