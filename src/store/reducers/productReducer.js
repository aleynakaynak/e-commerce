const initialState = {
  categories: [],
  productList: [],
  product: null, // detay sayfasındaki tek ürün
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED', // NOT_FETCHED, FETCHING, FETCHED, FAILED
}

function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_PRODUCT_LIST':
      return { ...state, productList: action.payload }
    case 'SET_PRODUCT':
      return { ...state, product: action.payload }
    case 'SET_TOTAL':
      return { ...state, total: action.payload }
    case 'SET_FETCH_STATE':
      return { ...state, fetchState: action.payload }
    case 'SET_LIMIT':
      return { ...state, limit: action.payload }
    case 'SET_OFFSET':
      return { ...state, offset: action.payload }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

export default productReducer
