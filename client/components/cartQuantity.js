import React from 'react'
//needs love
const CartQuantity = props => {
  return (
    <div>
      <p>Quantity: {product.orderDetail.quantity}</p>
      <select
        name="quantity"
        onChange={event => props.editQuantity(product, event.target.value)}
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
