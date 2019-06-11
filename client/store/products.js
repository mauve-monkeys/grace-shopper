import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */

const initialState = {
  all: [] //list of objects which represent products
}

/**
 * ACTION CREATORS
 */

const gotProducts = data => ({
  type: GOT_ALL_PRODUCTS,
  data
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
    default:
      return state
  }
}
