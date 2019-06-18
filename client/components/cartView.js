import React from 'react'
import {connect} from 'react-redux'
import {
  editQuantityLoggedInThunk,
  editQuantityGuestThunk,
  getCartUserThunk,
  getCartGuestThunk,
  deleteCartItemGuestThunk,
  deleteCartItemLoggedInThunk,
  submitCheckoutLoggedInThunk,
  submitCheckoutGuestThunk
} from '../store/cart'
import CartEmpty from './cartEmpty'
import CartFull from './cartFull'

class CartView extends React.Component {
  render() {
    return (
      <div className="cart-view">
        {this.props.cart === null || this.props.cart.length === 0 ? (
          <CartEmpty />
        ) : (
          <CartFull
            cart={this.props.cart}
            isLoggedIn={this.props.isLoggedIn}
            deleteCartItemLoggedIn={this.props.deleteCartItemLoggedIn}
            deleteCartItemGuest={this.props.deleteCartItemGuest}
            submitCheckoutLoggedIn={this.props.submitCheckoutLoggedIn}
            submitCheckoutGuest={this.props.submitCheckoutGuest}
            user={this.props.user}
            editQuantityLoggedIn={this.props.editQuantityLoggedIn}
            editQuantityGuest={this.props.editQuantityGuest}
          />
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
  editQuantityLoggedIn: (product, quantity, orderId) =>
    dispatch(editQuantityLoggedInThunk(product, quantity, orderId)),
  getCartUser: userId => dispatch(getCartUserThunk(userId)),
  getCartGuest: () => dispatch(getCartGuestThunk()),
  deleteCartItemGuest: product => dispatch(deleteCartItemGuestThunk(product)),
  deleteCartItemLoggedIn: (product, orderId) =>
    dispatch(deleteCartItemLoggedInThunk(product, orderId)),
  submitCheckoutLoggedIn: userId =>
    dispatch(submitCheckoutLoggedInThunk(userId)),
  submitCheckoutGuest: cart => dispatch(submitCheckoutGuestThunk(cart)),
  editQuantityGuest: (product, quantity) =>
    dispatch(editQuantityGuestThunk(product, quantity))
})

export default connect(mapState, mapDispatch)(CartView)
