import React from 'react'
import {getProductDetailsThunk} from '../store/products'
import {connect} from 'react-redux'
// import SingleProduct from './singleProduct'

class DisconnectedProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    try {
      console.log('mounting component')
      this.props.DisconnectedProductDetails(this.props.match.params.id)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    console.log('I AM HERE!!!')
    if (!this.props.selected) {
      return <div>Loading...</div>
    }
    const selected = this.props.selected
    return (
      <section id="product-details">
        <h1>{selected.name}</h1>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProductDetails: id => dispatch(getProductDetailsThunk(id))
})

const mapStateToProps = state => ({
  selected: state.products.selected
})

const ProductDetails = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedProductDetails
)

export default ProductDetails
