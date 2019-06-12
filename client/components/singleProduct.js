import React from 'react'

const SingleProduct = props => {
  const product = props.product

  return (
    <section className="single-product">
      <div id="productTile">
        <img className="product-image" src={product.imageUrl} />
        <div>
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price}</div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
