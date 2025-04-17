import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const API_URL = 'http://localhost:8000/api'

export default function App() {
  const { t, i18n } = useTranslation()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    barcode: '',
    quantity: 1,
    location: 'Kühlschrank groß',
    expiration_date: ''
  })

  const fetchStock = async () => {
    const res = await fetch(`${API_URL}/stock`)
    const data = await res.json()
    setProducts(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, barcode: form.barcode })
    })

    await fetch(`${API_URL}/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        quantity: form.quantity,
        location: form.location,
        expiration_date: form.expiration_date
      })
    })

    setForm({ name: '', barcode: '', quantity: 1, location: 'Kühlschrank groß', expiration_date: '' })
    fetchStock()
  }

  useEffect(() => {
    fetchStock()
  }, [])

  const today = new Date()

  const getColor = (dateStr) => {
    const d = new Date(dateStr)
    const diff = (d - today) / (1000 * 60 * 60 * 24)
    if (diff <= 0) return 'bg-red-200'
    if (diff <= 3) return 'bg-yellow-100'
    return 'bg-green-100'
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <div>
          <button onClick={() => i18n.changeLanguage('de')} className="mr-2">🇩🇪</button>
          <button onClick={() => i18n.changeLanguage('en')}>🇬🇧</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 mb-8">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
          placeholder={t('name')} className="border p-2 w-full" />
        <input value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })}
          placeholder={t('barcode')} className="border p-2 w-full" />
        <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) })}
          placeholder={t('quantity')} className="border p-2 w-full" />
        <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
          className="border p-2 w-full">
          <option>Kühlschrank groß</option>
          <option>Kühlschrank klein</option>
          <option>Vorratskammerl</option>
          <option>Vorratsschränkle</option>
        </select>
        <input type="date" value={form.expiration_date} onChange={e => setForm({ ...form, expiration_date: e.target.value })}
          required className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{t('submit')}</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">{t('product')}</th>
            <th className="p-2">{t('quantity')}</th>
            <th className="p-2">{t('location')}</th>
            <th className="p-2">{t('expiration')}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className={getColor(p.expiration_date)}>
              <td className="p-2">{p.name}</td>
              <td className="p-2 text-center">{p.quantity}</td>
              <td className="p-2 text-center">{p.location}</td>
              <td className="p-2 text-center">{p.expiration_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
