import React from 'react'
import {getProductDetailsThunk, resetLoading} from '../store/products'
import {connect} from 'react-redux'
import {Loading, AddCartButton} from '.'

class DisconnectedProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    try {
      this.props.getProductDetails(this.props.match.params.id)
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    this.props.resetLoading('selected')
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    }
    const selected = this.props.selected
    return (
      <section id="product-details">
        <h1 className="product-name">{selected.name}</h1>
        <img className="product-image" src={selected.imageUrl} />
        <div className="product-text">
          <div className="product-description">
            Description {selected.description}
          </div>
          <div className="product-price">Price ${selected.price}</div>
          <div className="product-stone-tag">Stone {selected.stone}</div>
          <div className="product-band-tag">Band {selected.band}</div>
          <div className="product-SKU">Product # {selected.SKU}</div>
          <label>
            Select Size:
            <select className="ring-select">
              <option value="4">4</option>
              <option value="4">5</option>
              <option value="4">6</option>
              <option value="4">7</option>
              <option value="4">8</option>
            </select>
          </label>
        </div>

        <AddCartButton />
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProductDetails: id => dispatch(getProductDetailsThunk(id)),
  resetLoading: which => dispatch(resetLoading(which))
})

const mapStateToProps = state => ({
  selected: state.products.selected,
  loading: state.products.loadingSelected
})

const ProductDetails = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedProductDetails
)

export default ProductDetails
