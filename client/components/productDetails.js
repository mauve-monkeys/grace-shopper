import React from 'react'
import {getProductDetailsThunk} from '../store/products'
import {connect} from 'react-redux'

class DisconnectedProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    try {
      console.log('mounting component')
      this.props.getProductDetails(this.props.match.params.id)
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
        <img className="product-image" src={selected.imageUrl} />
        <div>
          <div className="product-name">{selected.name}</div>
          <div className="product-price">${selected.price}</div>
        </div>
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
