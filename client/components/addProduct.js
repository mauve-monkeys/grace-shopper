import React from 'react'
import Form from './form'
import {connect} from 'react-redux'
import {addProduct} from '../store/products'

class AddProductForm extends React.Component {
  constructor() {
    super()
    this.initialState = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      SKU: ''
    }
    this.state = this.initialState
    this.formProps = {
      title: 'Add Product',
      fields: [
        {
          id: 'name',
          name: 'Product Name',
          required: true,
          type: 'text'
        },
        {
          id: 'description',
          name: 'Description',
          required: true,
          type: 'text'
        },
        {
          id: 'imageUrl',
          name: 'Image Link',
          required: true,
          type: 'text'
        },
        {
          id: 'price',
          name: 'Price',
          required: true,
          type: 'number'
        },
        {
          id: 'SKU',
          name: 'SKU',
          required: true
        }
      ],
      onChangeHandler: this.onChangeHandler,
      onSubmitHandler: this.onSubmitHandler
    }
  }
  onChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  onSubmitHandler = () => {
    this.props.addProduct(this.state)
    this.setState(this.initialState)
    this.props.history.push('/products')
  }

  render() {
    return <Form fieldValues={this.state} {...this.formProps} />
  }
}

const mapStateToProps = state => ({
  isAdmin: !!state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm)
