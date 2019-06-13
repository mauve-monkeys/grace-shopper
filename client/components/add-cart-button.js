import React from 'react'
import {addToCartGuestThunk, addToCartLoggedInThunk} from '../store/cart'
import {connect} from 'react-redux'

const DisconnectedAddCartButton = props => {
  /// const for props
  const {selected, addToCartUser, addToCartGuest, isLoggedIn, userId} = props
  const addToCart = isLoggedIn ? addToCartUser : addToCartGuest

  return (
    <div>
      <button
        id="addCartButton"
        type="button"
        onClick={() => addToCart(selected, userId)}
      >
        add to cart
      </button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCartGuest: product => dispatch(addToCartGuestThunk(product)),
  addToCartUser: (product, userId) =>
    dispatch(addToCartLoggedInThunk(product, userId))
})

const mapStateToProps = state => ({
  selected: state.products.selected,
  isLoggedIn: !!state.user.id,
  userId: state.user.id
})

const AddCartButton = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAddCartButton
)

export default AddCartButton
