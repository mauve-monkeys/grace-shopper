import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
export const getCartAction = cart => ({
  type: GET_CART,
  cart
})

export const addCartAction = product => ({
  type: ADD_TO_CART,
  product
  ///product = {product id, quanity // default to 1, size}
})

export const deleteCartItem = item => ({
  type: DELETE_CART_ITEM,
  item
})

export const editItemQuanity = item => ({
  type: EDIT_QUANTITY,
  item
})

/**
 * THUNK CREATORS
 */
// export const getCartThunk = () => {
// return async(dispatch) => {

//     try {
//         if(localStorage.length > 0) {

//
//         } // need to localStore.setItem() in the the add to cart flow. This assumes THE KEYS ARE THE PRODUCT I
//         else {
//          const {data} = await axios.get("/api/cart") }
//         // only handles pulling cart from the DB for now
//         dispatch(getCartAction(data))
//     } catch (error) {
//         console.log("/api/cart get request failled")
//         //Need convo on error handling
//     }
// }
// }

/**
 * REDUCER
 */

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.product]
    case DELETE_CART_ITEM:
      const udpateState = state.filter(
        productObj =>
          productObj.id !== action.item.id &&
          productObj.size !== action.item.size
      )
      return udpateState
    case EDIT_QUANTITY:
      const udpateState = state.filter(
        productObj =>
          productObj.id !== action.item.id &&
          productObj.size !== action.item.size
      )
      return [...udpateState, action.item]
    default:
      return state
  }
}
