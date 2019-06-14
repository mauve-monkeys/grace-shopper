import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Orders from './orderHistory'
// import UserDetails from './profileForm'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, id} = props
  const displayName = firstName || email

  return (
    <div className="main-content">
      <h3>Welcome, {displayName}</h3>
      <Orders />
      {/* <button type="button" Link to UserDetails>
        Edit Profile here
      </button> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
