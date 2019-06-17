import React from 'react'
import {connect} from 'react-redux'
import {
  editItemQuanityAction,
  deleteCartItemAction,
  getCartUserThunk,
  getCartGuestThunk,
  deleteCartItemGuestThunk,
  deleteCartItemLoggedInThunk
} from '../store/cart'
import SingleProduct from './singleProduct'

class CartView extends React.Component {
  // componentDidMount() {
  //   const getCart = this.props.isLoggedIn
  //     ? this.props.getCartUser
  //     : this.props.getCartGuest

  //   console.log('cart', this.props.cart)
  //   console.log('user', this.props.user)

  //   getCart(this.props.user.id)
  // }
  render() {
    return (
      <div className="main-content">
        {this.props.cart === null || this.props.cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          this.props.cart.map(product => {
            return (
              <div key={product.id}>
                <SingleProduct product={product} />
                {/* <p>Quantity: {product.orderDetail.quantity}</p> */}
                {/* <select
                  name="quanity"
                  onChange={event =>
                    this.props.editQuantity(product, event.target.value)
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select> */}
                <button
                  type="button"
                  onClick={() => {
                    if (this.props.isLoggedIn) {
                      // this.props.deleteCartItemLoggedIn(product, 1)
                    } else {
                      this.props.deleteCartItemGuest(product)
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )
          })
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id,
  user: state.user
})

const mapDispatch = dispatch => ({
  editQuantity: (item, value) => dispatch(editItemQuanityAction(item, value)),
  getCartUser: userId => dispatch(getCartUserThunk(userId)),
  getCartGuest: () => dispatch(getCartGuestThunk()),
  deleteCartItemGuest: product => dispatch(deleteCartItemGuestThunk(product)),
  deleteCartItemLoggedIn: (product, orderId) =>
    dispatch(deleteCartItemLoggedInThunk(product, orderId))
})

export default connect(mapState, mapDispatch)(CartView)
