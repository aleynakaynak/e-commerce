// türkçe karakterleri temizleyip url'e uygun hale getirir: "Ayakkabı" -> "ayakkabi"
export const slugify = (text) => {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' }
  return text
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşü]/g, (ch) => map[ch])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// kategori linki: /shop/kadin/ayakkabi/2
export const getCategoryPath = (category) => {
  const gender = category.gender === 'k' ? 'kadin' : 'erkek'
  return `/shop/${gender}/${slugify(category.title)}/${category.id}`
}

// ürün linki: /shop/kadin/ayakkabi/2/urun-adi/123
export const getProductPath = (product, categories) => {
  const category = categories.find((c) => c.id === product.category_id)
  const base = category ? getCategoryPath(category) : '/shop/urun/kategori/' + product.category_id
  return `${base}/${slugify(product.name)}/${product.id}`
}

// gravatar resmi için email'in sha256 hash'i gerekiyor
export const getGravatarUrl = async (email) => {
  const data = new TextEncoder().encode(email.trim().toLowerCase())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=64`
}
