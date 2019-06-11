import React from 'react'

const SingleProduct = props => {
  const product = props.product
  return (
    <div>
      <h1>product.name</h1>
      <img src={product.image} />
    </div>
  )
}

export default SingleProduct
