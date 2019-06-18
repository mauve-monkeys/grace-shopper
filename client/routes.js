import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  ProductDetails,
  CartView,
  Loading,
  AddProductForm,
  Welcome
} from './components'
import {me} from './store'
import {getCartUserThunk, getCartGuestThunk} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  componentDidUpdate() {
    const getCart = this.props.user.id
      ? this.props.getCartUser
      : this.props.getCartGuest

    getCart(this.props.user.id)
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/products/:id"
          render={props => <ProductDetails {...props} />}
        />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/cart" component={CartView} />
        <Route exact path="/loading" component={Loading} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isAdmin && (
              /* Routes placed here are only available as an admin */
              <Route path="/add-product" component={AddProductForm} />
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getCartUser: id => dispatch(getCartUserThunk(id)),
    getCartGuest: () => dispatch(getCartGuestThunk())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  getUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
