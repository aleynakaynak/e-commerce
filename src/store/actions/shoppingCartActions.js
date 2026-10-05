export const setCart = (cart) => ({ type: 'SET_CART', payload: cart })
export const setPayment = (payment) => ({ type: 'SET_PAYMENT', payload: payment })
export const setAddress = (address) => ({ type: 'SET_ADDRESS', payload: address })

// aynı ürün varsa adedi artır, yoksa yeni satır ekle
export const addToCart = (product) => (dispatch, getState) => {
  const cart = getState().shoppingCart.cart
  const exists = cart.find((item) => item.product.id === product.id)

  if (exists) {
    dispatch(setCart(cart.map((item) => (item.product.id === product.id ? { ...item, count: item.count + 1 } : item))))
  } else {
    dispatch(setCart([...cart, { count: 1, checked: true, product }]))
  }
}

export const changeCount = (productId, amount) => (dispatch, getState) => {
  const cart = getState().shoppingCart.cart
  const newCart = cart
    .map((item) => (item.product.id === productId ? { ...item, count: item.count + amount } : item))
    .filter((item) => item.count > 0)
  dispatch(setCart(newCart))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
  const cart = getState().shoppingCart.cart
  dispatch(setCart(cart.filter((item) => item.product.id !== productId)))
}

export const toggleChecked = (productId) => (dispatch, getState) => {
  const cart = getState().shoppingCart.cart
  dispatch(setCart(cart.map((item) => (item.product.id === productId ? { ...item, checked: !item.checked } : item))))
}
