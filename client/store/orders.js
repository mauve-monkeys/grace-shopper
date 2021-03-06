import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'

//  ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'

// INITIAL STATE
const defaultState = [
  //   {id: 1, updatedAt: '12/12/12', total: '12.99'},
  //   {id: 2, updatedAt: '1/12/13', total: '120.99'}
]

// ACTION CREATORS
const getOrders = orders => ({type: GET_ORDERS, orders})

// THUNKS
export const getOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`)
    let orders = data[0].orders
    let ordersFilter = orders.filter(currentOrder => {
      if (currentOrder.status === 'confirmed') {
        return currentOrder
      }
    })
    if (data) {
      dispatch(getOrders(ordersFilter))
    }
  } catch (error) {
    console.log(error)
  }
}

// REDUCERS
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
