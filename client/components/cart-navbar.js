import React from 'react'
import {connect} from 'react-redux'

const CartNavbar = props => {
  const cartNum = props.cart.length
  return (
    <div>
      <i className="fas fa-shopping-cart" />
      <span>{cartNum}</span>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(CartNavbar)
