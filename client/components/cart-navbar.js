import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const CartNavbar = props => {
  let cartNum
  if (props.cart) {
    cartNum = props.cart.length
  } else {
    cartNum = 0
  }
  return (
    <Link to="/cart" className="cart-nav">
      <i className="fas fa-shopping-cart" />
      <span>{cartNum}</span>
    </Link>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(CartNavbar)
