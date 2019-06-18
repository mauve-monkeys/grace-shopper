import React from 'react'
//needs love
const CartQuantity = props => {
  const orderId = props.product.orderDetail
    ? props.product.orderDetail.orderId
    : null
  const quantity = props.product.orderDetail
    ? props.product.orderDetail.quantity
    : props.quantity

  const editQuantity = props.isLoggedIn
    ? props.editQuantityLoggedIn
    : props.editQuantityGuest

  return (
    <div>
      <p>
        Quantity:{' '}
        <select
          name="quantity"
          value={quantity}
          onChange={event =>
            editQuantity(props.product, +event.target.value, orderId)
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>
    </div>
  )
}

export default CartQuantity
