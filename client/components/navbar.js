import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {CartNavbar} from '.'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <section id="navbar">
    <h1>Grace Rings</h1>
    <nav>
      <span className="link-group">
        <Link to="/products">Shop</Link>
      </span>
      {isLoggedIn ? (
        <span className="link-group">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {isAdmin && (
            /* This will show when logged in as admin */
            <Link to="/add-product">Add Product</Link>
          )}
          <CartNavbar />
        </span>
      ) : (
        <span className="link-group">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <CartNavbar />
        </span>
      )}
    </nav>
    {/* <hr /> */}
  </section>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
