import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const SUBMIT_CHECKOUT = 'SUBMIT_CHECKOUT'

const serializeCart = cart => {
  return JSON.stringify(cart)
}

const deSerializeCart = stringifiedCart => {
  return JSON.parse(stringifiedCart)
}
/**
 * INITIAL STATE
 */

let localCart = localStorage.getItem('GScart')
const defaultCart = deSerializeCart(localCart ? localCart : '[]')

// {
//   id: 1,
//   name: 'test product',
//   price: '12.99',
//   imageUrl: '',
//   orderDetail: {
//     quantity: 3
//   }
// }

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

export const submitCheckoutAction = () => ({
  type: SUBMIT_CHECKOUT
})

/**
 * THUNK CREATORS
 */

//Where do we put this logic?
/// [{id,  orderDetail.quantity}, {id, orderDetail.quanity} ]
/// "id:quanty,id2:quantity2"

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
    let cart = deSerializeCart(localStorage.getItem('GScart'))
    if (cart === null) {
      cart = []
    }
    const newCart = [...cart, product]
    // if (newCart[newCart.length - 1].orderDetail) {
    //   newCart[newCart.length - 1].orderDetail.quantity++
    // } else {
    //   newCart[newCart.length - 1].orderDetail = {
    //     quantity: 1
    //   }
    // }
    localStorage.setItem('GScart', serializeCart(newCart))

    dispatch(addCartAction(product))
  }
}

export const deleteCartItemGuestThunk = product => {
  return dispatch => {
    let cart = deSerializeCart(localStorage.getItem('GScart'))
    const newCart = cart.filter(productObj => productObj.id !== product.id)
    localStorage.setItem('GScart', serializeCart(newCart))
    dispatch(deleteCartItemAction(product))
  }
}

export const deleteCartItemLoggedInThunk = (product, orderId) => {
  return async dispatch => {
    try {
      console.log('delete logged in thunk')
      await axios.put(`api/orders/${orderId}/cart/delete/${product.id}`)
      dispatch(deleteCartItemAction(product))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getCartGuestThunk = () => {
  return dispatch => {
    try {
      const cart = deSerializeCart(localStorage.getItem('GScart'))
      dispatch(getCartAction(cart))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getCartUserThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}/cart`)

      dispatch(getCartAction(data.products))
    } catch (error) {
      console.error(error)
    }
  }
}

export const submitCheckoutLoggedInThunk = userId => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/cart/submit/${userId}`)
      localStorage.setItem('GScart', '')
      dispatch(submitCheckoutAction())
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
      if (state === null) {
        state = []
      }
      return [...state, {...action.product}]
    case DELETE_CART_ITEM:
      return state.filter(productObj => productObj.id !== action.product.id)
    case EDIT_QUANTITY:
      return [
        ...state.filter(
          productObj => productObj.product.id !== action.product.id
        ),
        action.product
      ]
    case SUBMIT_CHECKOUT:
      return defaultCart
    default:
      return state
  }
}
