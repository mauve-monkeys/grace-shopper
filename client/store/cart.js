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
  if (!stringifiedCart) {
    stringifiedCart = '[]'
  }
  return JSON.parse(stringifiedCart)
}
/**
 * INITIAL STATE
 */

const defaultCart = deSerializeCart(localStorage.getItem('GScart'))

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
export const getCartAction = (cart = []) => ({
  type: GET_CART,
  cart
})

export const addCartAction = (product, quantity = 1, orderId) => ({
  type: ADD_TO_CART,
  product: {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    orderDetail: {
      quantity,
      orderId
    }
  }
  ///product = {product id, quantity // default to 1, size}
})

export const deleteCartItemAction = product => ({
  type: DELETE_CART_ITEM,
  product
})

export const editItemQuantityAction = (product, quantity) => ({
  type: EDIT_QUANTITY,
  product: {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    orderDetail: {
      quantity,
      orderId: product.orderDetail.orderId
    }
  }
})

export const submitCheckoutAction = () => ({
  type: SUBMIT_CHECKOUT
})

/**
 * THUNK CREATORS
 */

export const editQuantityLoggedInThunk = (product, quantity, orderId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orderDetails/quantity/${orderId}/${product.id}`, {
        quantity
      })
      dispatch(editItemQuantityAction(product, quantity))
    } catch (error) {
      console.error(error.stack)
    }
  }
}

export const editQuantityGuestThunk = (product, quantity) => {
  return dispatch => {
    try {
      let cart = deSerializeCart(localStorage.getItem('GSCart'))

      cart = cart.map(productObj => {
        if (productObj.id === product.id) {
          productObj.orderDetail.quantity = quantity
        }
        return productObj
      })

      localStorage.setItem('GSCart', serializeCart(cart))

      dispatch(editItemQuantityAction(product, quantity))
    } catch (error) {
      console.error(error.stack)
    }
  }
}

export const addToCartLoggedInThunk = (product, userId, quantity = 1) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${userId}/cart/add`, {
        productId: product.id,
        quantity: quantity
      })
      //data is the order id
      dispatch(addCartAction(product, quantity, data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartGuestThunk = (product, quantity = 1) => {
  return dispatch => {
    let cart = deSerializeCart(localStorage.getItem('GScart'))
    let updatedQuantity = false

    let newCart = cart.map(productObj => {
      if (productObj.id === product.id) {
        productObj.orderDetail.quantity += quantity
        updatedQuantity = true
      }
      return productObj
    })

    if (!updatedQuantity) {
      product.orderDetail = {quantity}
      newCart = [...newCart, product]
    }

    localStorage.setItem('GScart', serializeCart(newCart))

    dispatch(addCartAction(product, quantity))
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

export const submitCheckoutGuestThunk = cart => {
  return async dispatch => {
    try {
      await axios.post(`/api/orders/cart/submit/guest`, {
        cart
      })
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
      let updatedQuantity = false
      // check to see if product is already in cart, if so just update the quantity
      let cartCopy = state.map(product => {
        // if item is in cart
        if (product.id === action.product.id) {
          product.orderDetail.quantity += action.product.orderDetail.quantity
          updatedQuantity = true
        }
        return product
      })
      if (updatedQuantity) {
        return cartCopy
      } else {
        return [...state, {...action.product}]
      }
    case DELETE_CART_ITEM:
      return state.filter(productObj => productObj.id !== action.product.id)
    case EDIT_QUANTITY:
      return [
        ...state.filter(productObj => {
          return productObj.id !== action.product.id
        }),
        action.product
      ]
    case SUBMIT_CHECKOUT:
      return defaultCart
    default:
      return state
  }
}
