import React from 'react'
import {addToCartGuestThunk, addToCartLoggedInThunk} from '../store/cart'
import {connect} from 'react-redux'

const DisconnectedAddCartButton = props => {
  /// const for props
  const {selected, addToCartUser, addToCartGuest, isLoggedIn} = props
  const addToCart = isLoggedIn ? addToCartUser : addToCartGuest

  return (
    <div>
      <button
        id="addCartButton"
        type="button"
        onClick={() => addToCart(selected)}
      >
        add to cart
      </button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCartGuest: product => dispatch(addToCartGuestThunk(product)),
  addToCartUser: product => dispatch(addToCartLoggedInThunk(product))
})

const mapStateToProps = state => ({
  selected: state.products.selected,
  isLoggedIn: !!state.user.id
})

const AddCartButton = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAddCartButton
)

export default AddCartButton
