import React from 'react'
import {connect} from 'react-redux'
import {
  editItemQuanityAction,
  deleteCartItemAction,
  getCartUserThunk,
  getCartGuestThunk
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
                {console.log(product)}
                <p>Quantity: {product.orderDetail.quantity}</p>
                <select
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
                </select>
                <button
                  type="button"
                  onClick={() => this.props.deleteItem(product)}
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
  deleteItem: item => dispatch(deleteCartItemAction(item)),
  getCartUser: userId => dispatch(getCartUserThunk(userId)),
  getCartGuest: () => dispatch(getCartGuestThunk())
})

export default connect(mapState, mapDispatch)(CartView)
