// şimdilik sabit veri, ileride API'den gelecek
const img = (name, w, h) => `https://picsum.photos/seed/${name}/${w}/${h}`

export const heroSlides = [
  {
    id: 1,
    season: 'SUMMER 2025',
    title: 'NEW COLLECTION',
    text: 'We know how large objects will act, but things on a small scale.',
    image: img('bandage-hero1', 700, 700),
  },
  {
    id: 2,
    season: 'WINTER 2025',
    title: 'NEW COLLECTION',
    text: 'We know how large objects will act, but things on a small scale.',
    image: img('bandage-hero2', 700, 700),
  },
]

export const greenSlides = [
  {
    id: 1,
    season: 'SUMMER 2025',
    title: 'Vita Classic Product',
    text: 'We know how large objects will act, We know how are objects will act, We know',
    price: '$16.48',
    image: img('bandage-vita1', 600, 700),
  },
  {
    id: 2,
    season: 'SUMMER 2025',
    title: 'Vita Classic Product',
    text: 'We know how large objects will act, We know how are objects will act, We know',
    price: '$19.99',
    image: img('bandage-vita2', 600, 700),
  },
]

export const editorsPick = {
  men: img('bandage-men', 510, 500),
  women: img('bandage-women', 240, 500),
  accessories: img('bandage-acc', 240, 240),
  kids: img('bandage-kids', 240, 240),
}

export const products = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  id: i,
  title: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.48',
  price: '$6.48',
  image: img('bandage-product' + i, 240, 300),
}))

export const neuralImage = img('bandage-neural', 700, 600)

export const posts = [1, 2, 3].map((i) => ({
  id: i,
  title: "Loudest à la Madison #1 (L'integral)",
  text: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  date: '22 April 2021',
  comments: 10,
  image: img('bandage-post' + i, 350, 300),
}))
