import api from '../../api/axiosInstance'

export const setCategories = (categories) => ({ type: 'SET_CATEGORIES', payload: categories })
export const setProductList = (list) => ({ type: 'SET_PRODUCT_LIST', payload: list })
export const setProduct = (product) => ({ type: 'SET_PRODUCT', payload: product })
export const setTotal = (total) => ({ type: 'SET_TOTAL', payload: total })
export const setFetchState = (fetchState) => ({ type: 'SET_FETCH_STATE', payload: fetchState })
export const setLimit = (limit) => ({ type: 'SET_LIMIT', payload: limit })
export const setOffset = (offset) => ({ type: 'SET_OFFSET', payload: offset })
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter })

export const fetchCategories = () => (dispatch, getState) => {
  if (getState().product.categories.length > 0) return
  api
    .get('/categories')
    .then((res) => dispatch(setCategories(res.data)))
    .catch((err) => console.log(err))
}

// params: { category, sort, filter, limit, offset } - boş olanlar gönderilmiyor
export const fetchProducts = (params) => (dispatch) => {
  const query = {}
  Object.keys(params).forEach((key) => {
    if (params[key] !== '' && params[key] !== undefined && params[key] !== null) {
      query[key] = params[key]
    }
  })

  dispatch(setFetchState('FETCHING'))
  api
    .get('/products', { params: query })
    .then((res) => {
      dispatch(setTotal(res.data.total))
      dispatch(setProductList(res.data.products))
      dispatch(setFetchState('FETCHED'))
    })
    .catch(() => dispatch(setFetchState('FAILED')))
}

export const fetchProduct = (productId) => (dispatch) => {
  dispatch(setProduct(null))
  dispatch(setFetchState('FETCHING'))
  api
    .get('/products/' + productId)
    .then((res) => {
      dispatch(setProduct(res.data))
      dispatch(setFetchState('FETCHED'))
    })
    .catch(() => dispatch(setFetchState('FAILED')))
}
