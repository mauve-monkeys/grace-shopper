import React from 'react'
import {connect} from 'react-redux'
import {getUserDetailsThunk} from './user-home'

class ProfileForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getUserDetailsThunk(userId)
  }
  render() {
    if (!this.props.orders) {
      return <div />
    }
    return (
      <div id="input-form">
        <label type="input">Email</label>
        <label type="input">Password</label>
        <label type="input">First Name</label>
        <label type="input">Shipping Address</label>
        <label type="input">Billing Address</label>
        <label type="input">Payment Method</label>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetailsThunk(userId))
})

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user.id
})

const UserDetails = connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

export default UserDetails
{
  /* <input type="checkbox" />
      <span class="label-body">Confirm</span>
      <input class="button-primary" type="submit" value="Submit" /> */
}
