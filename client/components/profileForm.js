import React from 'react'
import {connect} from 'react-redux'
import {getUserDetailsThunk, updateUserDetailsThunk} from '../store/user'

class ProfileForm extends React.Component {
  constructor(props) {
    super()
    this.handleSumbit = this.handleSumbit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      username: props.user.username,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      shippingAddress: props.user.shippingAddress,
      billingAddress: props.user.billingAddress
    }
  }
  componentDidMount() {
    this.props.getUserDetails(this.props.user.id)
  }
  render() {
    if (!this.props.orders) {
      return <div />
    }
    return (
      <form onSubmit={this.handleSumbit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input
          type="text"
          name="shippingAddress"
          value={this.state.shippingAddress}
          onChange={this.handleChange}
        />
        <label htmlFor="billingAddress">Billing Address:</label>
        <input
          type="text"
          name="billingAddress"
          value={this.state.billingAddress}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }

  handleSumbit(event) {
    event.preventDefault()
    this.props.updateUserDetails(this.props.user.id, this.state)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

const mapDispatchToProps = dispatch => ({
  updateUserDetails: (userId, values) =>
    dispatch(updateUserDetailsThunk(userId, values)),
  getUserDetails: userId => dispatch(getUserDetailsThunk(userId))
})

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
