import React from 'react'
//one order componant that can be re-usable

const SingleOrder = props => {
  const order = props.order

  return (
    // className="order-tile"
    <tr>
      <td>{order.id}</td>
      <td>{order.updatedAt}</td>
      <td>{order.total}</td>
    </tr>
  )
}

export default SingleOrder
