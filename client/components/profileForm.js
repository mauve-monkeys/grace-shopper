import React from 'react'
import {connect} from 'react-redux'
import {me, updateUserDetailsThunk} from '../store/user'

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

  render() {
    if (!this.props.orders) {
      return <div />
    }
    return (
      <div className="form-container">
        <h3 className="form-title">Edit Profile</h3>
        <form onSubmit={this.handleSumbit}>
          <div className="form-field-container">
            <div className="form-field">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-field-container">
            <div className="form-field">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-field-container">
            <div className="form-field">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-field-container">
            <div className="form-field">
              <label htmlFor="shippingAddress">Shipping Address:</label>
              <input
                type="text"
                name="shippingAddress"
                value={this.state.shippingAddress}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-field-container">
            <div className="form-field">
              <label htmlFor="billingAddress">Billing Address:</label>
              <input
                type="text"
                name="billingAddress"
                value={this.state.billingAddress}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

  async handleSumbit(event) {
    event.preventDefault()
    await this.props.updateUserDetails(this.props.user.id, this.state)
    this.props.getUserDetails()
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
  getUserDetails: () => dispatch(me())
})

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
