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
    id: 1,
    name: 'test product',
    price: '12.99',
    imageUrl: '',
    orderDetail: {
      quantity: 3
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
  product: {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    orderDetail: {
      quanity: quantity
    }
  }
  ///product = {product id, quanity // default to 1, size}
})

export const deleteCartItemAction = product => ({
  type: DELETE_CART_ITEM,
  product
})

export const editItemQuanityAction = (product, quantity) => ({
  type: EDIT_QUANTITY,
  product: {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    orderDetail: {
      quanity: quantity
    }
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

export const getCartGuestThunk = () => {
  return dispatch => {
    try {
      dispatch(getCartAction(localStorage.cart))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getCartUserThunk = userId => {
  console.log('getcartuserthunk1')
  return async dispatch => {
    try {
      console.log('getcartuserthunk')
      const [cart] = await axios.get(`/api/orders/${userId}/cart`)
      console.log('cart', cart)
      dispatch(getCartAction(cart.products))
    } catch (error) {
      console.error(error)
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
      return state.filter(productObj => productObj.id !== action.product.id)
    case EDIT_QUANTITY:
      return [
        ...state.filter(
          productObj => productObj.product.id !== action.product.id
        ),
        action.product
      ]
    default:
      return state
  }
}
