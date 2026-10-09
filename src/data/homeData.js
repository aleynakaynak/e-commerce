// sabit metinler; görseller API'den gelen ürün ve kategorilerden alınıyor
export const heroSlides = [
  {
    id: 1,
    season: 'SUMMER 2025',
    title: 'NEW COLLECTION',
    text: 'We know how large objects will act, but things on a small scale.',
  },
  {
    id: 2,
    season: 'WINTER 2025',
    title: 'NEW COLLECTION',
    text: 'We know how large objects will act, but things on a small scale.',
  },
]

export const greenSlides = [
  {
    id: 1,
    season: 'SUMMER 2025',
    title: 'Vita Classic Product',
    text: 'We know how large objects will act, We know how are objects will act, We know',
  },
  {
    id: 2,
    season: 'SUMMER 2025',
    title: 'Vita Classic Product',
    text: 'We know how large objects will act, We know how are objects will act, We know',
  },
]

export const posts = [1, 2, 3].map((i) => ({
  id: i,
  title: "Loudest à la Madison #1 (L'integral)",
  text: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  date: '22 April 2021',
  comments: 10,
}))

// statik sayfalarda kullanılan kategori fotoğrafları
const categoryImg = (name) => `https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_${name}.jpg`

export const pageImages = {
  about: categoryImg('kadın_elbise'),
  contact: categoryImg('kadın_ceket'),
  video: categoryImg('erkek_ceket'),
  work: categoryImg('kadın_kazak'),
  teamBig: categoryImg('kadın_tişört'),
  teamSmall: [categoryImg('erkek_gömlek'), categoryImg('kadın_ayakkabı'), categoryImg('erkek_tişört'), categoryImg('kadın_etek')],
}
