import React from 'react'
import {getOrdersThunk} from '../store/orders'
import {connect} from 'react-redux'
import SingleOrder from './singleOrder'

// all of our individual user's orders
class DisconnectedOrders extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    try {
      this.props.getOrders(this.props.user.id)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    if (!this.props.orders) {
      return <div />
    }
    const orders = this.props.orders
    return (
      <section id="orders-table">
        <h1>Order History</h1>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date Purchased</th>
              <th>Total Amount</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return <SingleOrder key={order.id} order={order} />
            })}
          </tbody>
        </table>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getOrders: userId => dispatch(getOrdersThunk(userId))
})

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user
})

const Orders = connect(mapStateToProps, mapDispatchToProps)(DisconnectedOrders)

export default Orders
