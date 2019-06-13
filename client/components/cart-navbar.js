import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const CartNavbar = props => {
  const cartNum = props.cart.length
  return (
    <Link to="/cart">
      <i className="fas fa-shopping-cart" />
      <span>{cartNum}</span>
    </Link>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(CartNavbar)
