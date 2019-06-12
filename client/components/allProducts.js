import React from 'react'
import {getProducts} from '../store/products'
import {connect} from 'react-redux'
import SingleProduct from './singleProduct'

class DisconnectedAllProducts extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    if (!this.props.products) {
      return <div>Loading...</div>
    }
    return (
      <section id="all-products">
        <h1>All Products</h1>
        {this.props.products.map(product => {
          return <SingleProduct key={product.id} product={product} />
        })}
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

const mapStateToProps = state => ({
  products: state.products.all
})

const AllProducts = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllProducts
)

export default AllProducts
