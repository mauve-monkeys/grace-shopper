import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_DETAILS = 'GET_USER_DETAILS'
const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'

/**
 * INITIAL STATE
 *
 *
 *
 *
 *
 *
 *
 *
 */
const defaultUser = {
  selected: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getUserDetails = userId => ({type: GET_USER_DETAILS})
const updateUserDetails = user => ({type: UPDATE_USER_DETAILS, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const getUserDetailsThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(getUserDetails(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateUserDetailsThunk = userId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}/edit`)
    dispatch(updateUserDetails(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GET_USER_DETAILS:
      return {
        ...state,
        selected: action.user
      }
    default:
      return state
  }
}
