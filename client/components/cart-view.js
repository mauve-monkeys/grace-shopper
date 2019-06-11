import React from "react"
import { connect }  from 'react-redux';
import { editItemQuanityAction, deleteCartItemAction  } from './cart';
//Import single product

class CartView extends React.Component {

    render () {
        return (
            <div>
                {this.props.cart.map(product => { 
                    return (
                        <div> 
                            <SingleProduct key={product.id} product={product}/>
                                <select name="quanity" onChange={(event) => editQuantity(item, event.target.value) }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button type="button" onClick={() => deleteItem(item)}>Delete</button>

                        </div>)})}
            </div>
        )
    }
}

const mapState = (state) => ({
    cart: state.cart
  })

const mapDispatch = (dispatch) => ({
    editQuantity: () => dispatch(editItemQuanityAction(item, value)),
    deleteItem: () => dispatch(deleteCartItemAction(item))
    
})

export default connect(mapState, mapDispatch)(FullCampusList)