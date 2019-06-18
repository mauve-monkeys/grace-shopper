import React from 'react'
//one order componant that can be re-usable

const SingleOrder = props => {
  const order = props.order

  return (
    // className="order-tile"
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.updatedAt.slice(0, 10)}</td>
      <td>{order.total}</td>
      <td>{order.status}</td>
    </tr>
  )
}

export default SingleOrder
