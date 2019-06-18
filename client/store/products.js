import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const RESET_LOADING = 'RESET_LOADING'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */

const initialState = {
  all: [], //list of objects which represent products
  selected: {},
  loadingAll: true,
  loadingSelected: true
}

/**
 * ACTION CREATORS
 */

const gotProducts = data => ({
  type: GOT_ALL_PRODUCTS,
  data
})

const gotSingleProduct = product => ({
  type: GOT_SINGLE_PRODUCT,
  product
})

export const resetLoading = which => ({
  type: RESET_LOADING,
  which //indicates if it's for allProducts or selected
})

const addedProduct = product => ({
  type: ADD_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(gotProducts(data))
    } catch (error) {
      console.error(error.stack)
    }
  }
}

export const getProductDetailsThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(gotSingleProduct(data))
    } catch (error) {
      console.error(error.stack)
    }
  }
}

export const addProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/products/add', product)
      dispatch(addedProduct(data))
    } catch (error) {
      console.error(error.stack)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {
        ...state,
        all: action.data,
        loadingAll: false
      }
    case GOT_SINGLE_PRODUCT:
      return {
        ...state,
        selected: action.product,
        loadingSelected: false
      }
    case RESET_LOADING:
      if (action.which === 'all') {
        return {
          ...state,
          loadingAll: true
        }
      } else {
        return {
          ...state,
          loadingSelected: true
        }
      }
    case ADD_PRODUCT:
      return {
        ...state,
        all: [...state.all, action.product]
      }
    default:
      return state
  }
}
