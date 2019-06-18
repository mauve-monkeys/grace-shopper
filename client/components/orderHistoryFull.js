import React from 'react'
import SingleOrder from './singleOrder'

const OrderHistoryFull = props => {
  const orders = props.orders

  return (
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
  )
}
export default OrderHistoryFull
