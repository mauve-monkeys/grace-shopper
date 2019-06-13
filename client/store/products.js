import axios from 'axios'
import history from '../history'
import {token} from '/Users/nicolebent/Desktop/GHP_1094/Senior-Phase/grace-shopper/secrets.js'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */

const initialState = {
  all: [], //list of objects which represent products
  selected: {}
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
      const {data} = await axios.get(`/api/products/${id}`, {
        headers: {Authorization: `bearer ${token}`}
      })
      dispatch(gotSingleProduct(data))
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
        all: action.data
      }
    case GOT_SINGLE_PRODUCT:
      return {
        ...state,
        selected: action.product
      }
    default:
      return state
  }
}
