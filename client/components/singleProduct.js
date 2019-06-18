// this component is for the single product display on the all products component

import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = props => {
  const product = props.product

  return (
    <section className="product-tile">
      <Link to={`/products/${product.id}`}>
        <img className="product-image" alt="" src={product.imageUrl} />

        <div className="product-name">{product.name}</div>
      </Link>
      <div className="product-price">${product.price}</div>
    </section>
  )
}

export default SingleProduct
