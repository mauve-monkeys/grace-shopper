import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */


/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
