import React from 'react'
import {getOrdersThunk} from '../store/orders'
import {connect} from 'react-redux'
import OrderHistoryFull from './orderHistoryFull'

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
    console.log(orders, 'orders')
    return (
      <section id="orders-table">
        <h1>Order History</h1>
        {orders.length >= 1 ? (
          <OrderHistoryFull orders={orders} />
        ) : (
          <div> You have no past orders</div>
        )}
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
