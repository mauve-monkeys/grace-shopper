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

export const addCartAction = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  product: {
    ...product,
    quantity
  }
  ///product = {product id, quanity // default to 1, size}
})

export const deleteCartItemAction = item => ({
  type: DELETE_CART_ITEM,
  item
})

export const editItemQuanityAction = (item, value) => ({
  type: EDIT_QUANTITY,
  item: {
    ...item,
    value
  }
})

/**
 * THUNK CREATORS
 */

 //Where do we put this logic?
export const addToCartThunk = (item) => {
  return (dispatch) => {
    if(localStorage.cart) {
      localStorage.setItem("cart", [...localStorage.cart, item])
    } else {
      localStorage.setItem("cart", [item])
    }
    dispatch(addCartAction(item))
  }
}



export const getCartThunk = () => {
return (dispatch) => {
  if(localStorage.cart) {
    dispatch(getCartAction(localStorage.cart))
  }
  }
}

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
