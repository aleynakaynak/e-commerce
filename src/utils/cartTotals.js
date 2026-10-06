const SHIPPING = 29.99

// sepetteki seçili ürünlere göre toplamları hesaplar
export const calcTotals = (cart) => {
  const productsTotal = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.count * item.product.price, 0)

  // 150 TL üzeri kargo bedava (indirim olarak gösteriliyor)
  const discount = productsTotal >= 150 ? SHIPPING : 0
  const grandTotal = productsTotal > 0 ? productsTotal + SHIPPING - discount : 0

  return { productsTotal, shipping: SHIPPING, discount, grandTotal }
}
