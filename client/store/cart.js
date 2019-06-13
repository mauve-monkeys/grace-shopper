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
const defaultCart = [
  {
    quantity: 3,
    product: {
      id: 1,
      name: 'test product',
      price: '12.99',
      imageUrl: ''
    }
  }
]

/**
 * ACTION CREATORS
 */
export const getCartAction = cart => ({
  type: GET_CART,
  cart
})

export const addCartAction = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  orderDetail: {
    product: product,
    quantity
  }
  ///product = {product id, quanity // default to 1, size}
})

export const deleteCartItemAction = product => ({
  type: DELETE_CART_ITEM,
  product
})

export const editItemQuanityAction = (product, quantity) => ({
  type: EDIT_QUANTITY,
  orderDetail: {
    product: product,
    quantity
  }
})

/**
 * THUNK CREATORS
 */

//Where do we put this logic?
export const addToCartLoggedInThunk = (product, userId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${userId}/cart/add`, {
        productId: product.id
      }) //// we need to update this
      dispatch(addCartAction(product))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartGuestThunk = product => {
  return dispatch => {
    // if (localStorage.cart) {
    //   localStorage.setItem('cart', [...localStorage.cart, product])
    // } else {
    //   localStorage.setItem('cart', [product])
    // }
    dispatch(addCartAction(product))
  }
}

export const getCartThunk = () => {
  return dispatch => {
    if (localStorage.cart) {
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
      return [...state, action.orderDetail]
    case DELETE_CART_ITEM:
      return state.filter(productObj => productObj.id !== action.product.id)
    case EDIT_QUANTITY:
      return [
        ...state.filter(
          productObj => productObj.product.id !== action.orderDetail.product.id
        ),
        action.orderDetail
      ]
    default:
      return state
  }
}
