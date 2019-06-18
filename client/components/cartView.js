import React from 'react'
import {connect} from 'react-redux'
import {
  editQuantityLoggedInThunk,
  deleteCartItemAction,
  getCartUserThunk,
  getCartGuestThunk,
  deleteCartItemGuestThunk,
  deleteCartItemLoggedInThunk,
  submitCheckoutLoggedInThunk,
  submitCheckoutAction
} from '../store/cart'
import CartEmpty from './cartEmpty'
import CartFull from './cartFull'

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
            editQuantity={this.props.editQuantity}
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
  editQuantity: (product, quantity, orderId) =>
    dispatch(editQuantityLoggedInThunk(product, quantity, orderId)),
  getCartUser: userId => dispatch(getCartUserThunk(userId)),
  getCartGuest: () => dispatch(getCartGuestThunk()),
  deleteCartItemGuest: product => dispatch(deleteCartItemGuestThunk(product)),
  deleteCartItemLoggedIn: (product, orderId) =>
    dispatch(deleteCartItemLoggedInThunk(product, orderId)),
  submitCheckoutLoggedIn: userId =>
    dispatch(submitCheckoutLoggedInThunk(userId)),
  submitCheckoutGuest: () => dispatch(submitCheckoutAction())
})

export default connect(mapState, mapDispatch)(CartView)
