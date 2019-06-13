import React from 'react'
import {connect} from 'react-redux'
import {editItemQuanityAction, deleteCartItemAction} from '../store/cart'
import SingleProduct from './singleProduct'

class CartView extends React.Component {
  componentDidMount() {
    console.log("I've made it to the cart component!")
  }
  render() {
    return (
      <div className="main-content">
        {this.props.cart.map(orderDetail => {
          return (
            <div key={orderDetail.product.id}>
              <SingleProduct product={orderDetail.product} />
              <p>Quantity: {orderDetail.quantity}</p>
              <select
                name="quanity"
                onChange={event =>
                  this.props.editQuantity(
                    orderDetail.product,
                    event.target.value
                  )
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button
                type="button"
                onClick={() => this.props.deleteItem(orderDetail.product)}
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  editQuantity: (item, value) => dispatch(editItemQuanityAction(item, value)),
  deleteItem: item => dispatch(deleteCartItemAction(item))
})

export default connect(mapState, mapDispatch)(CartView)
