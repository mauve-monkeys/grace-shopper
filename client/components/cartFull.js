import React from 'react'
import SingleProduct from './singleProduct'
import CartQuantity from './cartQuantity'

const CartFull = props => {
  return (
    <div>
      {props.cart.map(product => {
        return (
          <div key={product.id}>
            <SingleProduct product={product} />
            {/* <CartQuantity /> //need to pass props*/}
            <button
              type="button"
              onClick={() => {
                if (props.isLoggedIn) {
                  props.deleteCartItemLoggedIn(
                    product,
                    product.orderDetail.orderId
                  )
                } else {
                  props.deleteCartItemGuest(product)
                }
              }}
            >
              Delete
            </button>
          </div>
        )
      })}

      <button
        type="button"
        onClick={() => {
          if (props.isLoggedIn) {
            props.submitCheckoutLoggedIn(props.user.id)
          } else {
            props.submitCheckoutGuest()
          }
        }}
      >
        Submit Your Order
      </button>
    </div>
  )
}

export default CartFull
