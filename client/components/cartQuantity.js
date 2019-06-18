import React from 'react'
//needs love
const CartQuantity = props => {
  return (
    <div>
      <p>Quantity: {props.product.orderDetail.quantity}</p>
      <select
        name="quantity"
        onChange={event =>
          props.editQuantity(
            props.product,
            event.target.value,
            props.product.orderDetail.orderId
          )
        }
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  )
}

export default CartQuantity
