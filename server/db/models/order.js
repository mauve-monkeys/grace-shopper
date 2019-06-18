const Sequelize = require('sequelize')
const db = require('../db')
// const Product = require('./product')
// const OrderDetail = require('./orderDetail')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['pending', 'confirmed', 'cancelled']),
    allowNull: false,
    defaultValue: 'pending'
  },
  total: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0,
      isInt: true
    },
    defaultValue: 0
  },
  orderSize: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0,
      isInt: true
    },
    defaultValue: 0
  }
})

// Order.prototype.addProductCustom = async function(product) {
//   try {
//     console.log(product)
//     const orderDetail = await this.addProduct(product)
//     console.log(orderDetail)
//     this.total += product.dataValues.price * orderDetail[0].dataValues.quantity
//     this.orderSize += orderDetail[0].dataValues.quantity
//     await Order.update(
//       {
//         total: this.total,
//         orderSize: this.orderSize
//       },
//       {
//         where: {
//           id: this.id
//         }
//       }
//     )
//     return this.total.price
//   } catch (error) {
//     console.log('custom add products not working')
//     console.log(error)
//   }
// }

// Order.prototype.removeProductCustom = async function(product) {
//   try {
//     // const orderDetail = await this.getProduct(product)
//     await this.removeProduct(product)
//     // console.log(orderDetail.dataValues, 'orderDetail')
//     this.total -= product.dataValues.price
//     console.log(this.total, 'post add')
//     // this.orderSize -= orderDetail.dataValues.quantity
//     console.log(this.orderSize, 'ordersize')

//     await Order.update(
//       {
//         total: this.total,
//         orderSize: this.orderSize
//       },
//       {
//         where: {
//           id: this.id
//         }
//       }
//     )
//     return this.total.price
//   } catch (error) {
//     console.log('custom remove products not working')
//     console.log(error)
//   }
// }

module.exports = Order
