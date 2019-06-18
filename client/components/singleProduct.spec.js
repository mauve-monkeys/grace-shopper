// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {SingleProduct} from './singleProduct'
// // import {spy} from 'sinon'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('<SingleProduct /> component', () => {
//   let singleProduct = {
//     name: 'Test Ring',
//     imageUrl: 'https://s2.r29static.com/bin/product/a66/x/2123045/image.png',
//     price: 79
//   }

//   let renderSingleProduct
//   let wrapperComponent

//   beforeEach('Create component', () => {
//     renderSingleProduct = shallow(
//       <SingleProduct singleProduct={singleProduct} />
//     )
//   })
//   it('shows a product info', () => {
//     wrapperComponent = renderSingleProduct.node.props
//     expect(wrapperComponent.className).to.equal('product-info')
//   })
//   it('wrapper component shows a grid', () => {
//     expect(wrapperComponent.children.props.className).to.equal('product-tile')
//   })
// })
