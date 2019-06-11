import React from "react"

const AddCartButton = props => {
    /// const for props
    const { selectedProduct, addToCart } = props
    return (
        <div>
             <button id= "addCartButton" type="button" onClick={() => addToCart(selectedProduct)}>
        add to cart
        </button>
        </div>
    )
}