import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
 export const getCartAction = (cart) => ({
    type: GET_CART,
    cart
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
    default:
      return state
  }
}
